import uuid

from jose import JWTError
from jwt import ExpiredSignatureError
from pydantic.datetime_parse import timedelta, datetime
from spyne import Application, rpc, ServiceBase, Integer, Double, srpc, Unicode, ComplexModel, Iterable
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication
from spyne import String
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from pydantic import BaseModel
import jwt
from sqlalchemy import false
from wsgi_cors_middleware import CorsMiddleware

from repositories.token_repository import add_new_token, invalidate_token, get_db_token, delete_all_invalid_tokens
from repositories.users_roles_repository import create_association, get_roles_of_user, remove_user_role_by_username, \
    remove_user_role_by_id, get_roles_of_user_as_str
from repositories.role_repository import get_roles, get_role_by_value, add_new_role
from repositories.user_repository import get_users, create_user, get_user_by_name, modify_password, modify_username, \
    get_user_by_id, validate_user, invalidate_user

SECRET_KEY = "7a3282beeb90ab7b3b1f1512deeb323a01beeeeeccceab6310c0926bfc06907d"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str


def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()


class UserDTO(ComplexModel):
    id: int
    username: str
    validated: bool
    roles: []

    def __init__(self, id, username, validated,roles, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.id = id
        self.username = username
        self.validated = validated
        rl = []
        for role in roles:
            rl.append(str(RoleDTO(role.id, role.value)))
        self.roles = rl

    def __str__(self):
        return f"id:{self.id},username:{self.username}, validated: {self.validated}, roles:{self.roles}"


class RoleDTO(ComplexModel):
    id: int
    value: str

    def __init__(self, id, value, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.id = id
        self.value = value

    def __str__(self):
        return f"id:{self.id},value:{self.value}"


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(username: str, password: str):
    user = get_user_by_name(username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def get_token(ctx):
    authorization_header = ctx.transport.req_env.get("HTTP_AUTHORIZATION")
    token = None
    if authorization_header:
        try:
            token_type, token = authorization_header.split(" ")
            if token_type.lower() == "bearer":
                return token
        except ValueError:
            pass


def authorize(ctx):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token = get_token(ctx)
    token_from_database = get_db_token(token)
    if token_from_database != None:
        if token_from_database.expired == 1:
            return "Token expired"
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(payload)
        id: int = payload.get("sub")
        role: str = payload.get("role")
        if id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    except ExpiredSignatureError:
        invalidate_token(token)
        return "Token expired"
    user_role = get_roles_of_user(id)
    user_roles = list(map(lambda a: a.value, user_role))
    if str(user_roles).__contains__(role.replace("[", "").replace("]", "")):
        return "authorized -> " + str(id) + ":" + str(role)
    else:
        invalidate_token(token)
        return "User role doesn't correspond to the one from the token"

class CorsService(ServiceBase):
    origin = '*'

def _on_method_return_object(ctx):
    ctx.transport.resp_headers['Access-Control-Allow-Origin'] = \
                                              ctx.descriptor.service_class.origin

CorsService.event_manager.add_listener('method_return_object',
                                                        _on_method_return_object)
class UsersService(CorsService):
    @rpc(_returns=str)
    def authorize(ctx):
        return authorize(ctx)

    @rpc(_returns=Iterable(str))
    def getusers(ctx):
        lst = []
        # authorized = authorize(ctx)
        for user in get_users():
            roles = []
            for role in user.roles:
                roles.append(str(RoleDTO(role.id, role.value)))
            lst.append(str(UserDTO(user.id, user.username, user.validated, user.roles)))

        return lst

    @rpc(String, _returns=str)
    def get_user_by_username(ctx, username):
        authorized = authorize(ctx)
        if str(authorized).__contains__("authorized"):
            if authorized.split(":")[1].__contains__("administrator_aplicatie"):
                user = get_user_by_name(username)
                if user is None:
                    return "Not found"
                return str(UserDTO(user.id, user.username, user.validated, user.roles))
        return "Not authorized"

    @rpc(Integer, _returns=str)
    def get_user_by_id(ctx, id):
        authorized = authorize(ctx)
        if str(authorized).__contains__("authorized"):
            if (authorized.split(":")[1].__contains__("administrator_aplicatie")):
                user = get_user_by_id(id)
                if user is None:
                    return "Not found"
                return str(UserDTO(user.id, user.username, user.validated, user.roles))
        return "Not authorized"

    @rpc(_returns=Iterable(str))
    def get_roles(ctx):
        authorized = authorize(ctx)
        print(authorized)
        if str(authorized).__contains__("authorized"):

            #if (authorized.split(":")[1].__contains__("administrator_aplicatie")):
                lst = []
                for role in get_roles():
                    lst.append(str(RoleDTO(role.id, role.value)))
                return lst
        return "Not authorized"

    @rpc(String, String,  _returns=str)
    def register_user(ctx, username, password):
        authorized = authorize(ctx)
        if str(authorized).__contains__("authorized"):
            if (authorized.split(":")[1].__contains__("administrator_aplicatie")):
                if get_user_by_name(username) != None:
                    return "A user with this username already exists"
                user = create_user(username, password)
                # user = get_user_by_name(username)
                role = get_role_by_value("content_manager")
                create_association(user, role)
                for user in get_users():
                    if user.username == username:
                        return str(UserDTO(user.id, user.username, True,  user.roles))
        return "Not authorized"

    @rpc(Integer, _returns=str)
    def adm_validate_user(ctx, id):
        authorized = authorize(ctx)
        if str(authorized).__contains__("authorized"):
            if authorized.split(":")[1].__contains__("administrator_aplicatie"):
                validate_user(id)
                return str("Validated")
        return "Not authorized"

    @rpc(Integer, _returns=str)
    def adm_invalidate_user(ctx, id):
        authorized = authorize(ctx)
        if str(authorized).__contains__("authorized"):
            if authorized.split(":")[1].__contains__("administrator_aplicatie"):
                invalidate_user(id)
                return str("Invalidated")
        return "Not authorized"

    @rpc(String, String, _returns=str)
    def add_user_role(ctx, id, rol):
        authorized = authorize(ctx)
        if str(authorized).__contains__("authorized"):
            if authorized.split(":")[1].__contains__("administrator_aplicatie"):
                user = get_user_by_id(id)
                role = get_role_by_value(rol)
                if user is not None:
                    if role is not None:
                        create_association(user, role)
                        return str(f"Updated")
                return str("Not found")
        return str("Not authorized")

    @rpc(String, _returns=str)
    def add_role(ctx, value):
        authorized = authorize(ctx)
        if str(authorized).__contains__("authorized"):
            add_new_role(value)
            return str("Added")

    @rpc(Integer, String, _returns=str)
    def update_user_password(ctx, id, password):
        authorized = authorize(ctx)
        if str(authorized).__contains__("authorized"):
            modify_password(id, password)
            return str("Updated")
        else:
            return str("Not authorized")

    @rpc(Integer, String, _returns=str)
    def update_user_username(ctx, id, new_username):
        authorized = authorize(ctx)
        if str(authorized).__contains__("authorized"):
            modify_username(id, new_username)
            return str("Updated")

    @rpc(String, _returns=Iterable(str))
    def get_roles_for_user_by_username(ctx, username):
        authorized = authorize(ctx)
        if str(authorized).__contains__("authorized"):
            user = get_user_by_name(username)
            if user is None:
                return ["Not found"]
            roles = get_roles_of_user(user.id)
            print(roles)
            lst = []
            for role in roles:
                lst.append(str(role.value))
            return lst
        else:
            return ["Not found"]

    @rpc(Integer, String, _returns=str)
    def remove_role_by_username(ctx, id, role):
        authorized = authorize(ctx)
        if str(authorized).__contains__("authorized"):
            return remove_user_role_by_username(id, role)

    @rpc(Integer, Integer, _returns=str)
    def remove_role_by_id(ctx, id_user, id_role):
        authorized = authorize(ctx)
        if str(authorized).__contains__("authorized"):
            return remove_user_role_by_id(id_user, id_role)

    @rpc(String, String, _returns=str)
    def login(ctx, username, password):
        #ctx.transport.resp_headers['Access-Control-Allow-Origin'] = '*'
        user = get_user_by_name(username)
        if user is None:
            return "Login failed"
        if (user.password == password):
            payload = {
                'sub': user.id,
                'exp': datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
                'jti': str(uuid.uuid4()),
                'role': str(list(map(lambda x: x.value, get_roles_of_user(user.id))))
            }
            tkn = jwt.encode(payload, SECRET_KEY, ALGORITHM)
            add_new_token(tkn)
            return "Successful :" + str(tkn)
        return "Login failed"

    @rpc(_returns=str)
    def logout(ctx):
        authorized = authorize(ctx)
        if str(authorized).__contains__("authorized"):
            token = get_token(ctx)
            invalidate_token(token)
            return "Invalidated"

    @rpc(_returns=str)
    def check_if_token_is_expired(ctx):
        authorized = authorize(ctx)
        if str(authorized).__contains__("authorized"):
            token = get_token(ctx)
            exp = jwt.decode(token, SECRET_KEY, ALGORITHM, options={"verify_signature":False})["exp"]
            expiry_time = datetime.utcfromtimestamp(exp)
            if(datetime.utcnow() > expiry_time):
                invalidate_token(token)
                print("TOKEN EXPIRED")
                return "Token is expired"
            return "Token is valid"


    @rpc(_returns=str)
    def get_current_user(ctx):
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        authorized = authorize(ctx)
        if str(authorized).__contains__("authorized"):
            token = get_token(ctx)
            try:
                payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
                print(payload)
                id: int = payload.get("sub")
                if id is None:
                    raise credentials_exception
            except JWTError:
                raise credentials_exception
            user = get_user_by_id(id)
            if user is None:
                raise credentials_exception
            return str(UserDTO(user.id, user.username, user.validated, user.roles))

def cors_middleware(app):
    def cors_app(environ, start_response):
        headers = [('Access-Control-Allow-Origin', '*')]
        start_response('200 OK', headers)
        return app(environ, start_response)
    return cors_app



application = Application([UsersService], 'services.users.soap',
                          in_protocol=Soap11(validator='lxml'),
                          out_protocol=Soap11())

wsgi_application = WsgiApplication(application)
wsgi_application = CorsMiddleware(wsgi_application,

    methods=['POST'],
    headers=['Content-Type', 'Authorization'])

if __name__ == "__main__":
    import logging

    from wsgiref.simple_server import make_server

    delete_all_invalid_tokens()


    logging.basicConfig(level=logging.INFO)
    logging.getLogger('spyne.protocol.xml').setLevel(logging.INFO)

    logging.info("listening to http://127.0.0.1:8000")
    logging.info("wsdl is at: http://127.0.0.1:8000/?wsdl")

    server = make_server('127.0.0.1', 8000, wsgi_application)
    server.serve_forever()
