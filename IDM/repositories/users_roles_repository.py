from base.sql_base import Session
from models.user_orm import User
from models.users_roles_orm import user_roles_relationship
from repositories.role_repository import get_role_by_id, get_role_by_value
from repositories.user_repository import get_user_by_name, get_user_by_id


def create_association(user, role):
    session = Session().object_session(user)
    if(session!=None):
        session.expunge(user)
    role_session = Session().object_session(role)
    role_session.add(user)
    if role not in user.roles:
        user.roles.append(role)
        role_session.add(user)
        role_session.commit()


def get_roles_of_user(user_id):
    session = Session()
    rols = []
    r = session.query(user_roles_relationship).all()
    for rel in r:
        if str(rel).split(", ")[0].replace("(", "") == str(user_id):
            role_id = int(str(rel).replace("(", "").replace(")", "").split(", ")[1])
            role = get_role_by_id(role_id)
            rols.append(role)
            session.commit()
    return rols


def get_roles_of_user_as_str(user_id):
    session = Session()
    rols = []
    roless: str = ""
    r = session.query(user_roles_relationship).all()
    for rel in r:
        if str(rel).split(", ")[0].replace("(", "") == str(user_id):
            role_id = int(str(rel).replace("(", "").replace(")", "").split(", ")[1])
            role = get_role_by_id(role_id)
            rols.append(role)
            roless = roless + str(role)
            session.commit()
    return roless


def remove_user_role_by_username(user_id, role):
    user = get_user_by_id(user_id)
    rol = get_role_by_value(role)
    session = Session().object_session(user)
    if user is None:
        return "Failure"
    if rol is None:
        return "Failure"
    for rol in user.roles:
        if rol.value == role:
            session.add(user)
            user.roles.remove(rol)
            session.commit()
            return "Deleted"

    return "There is no such relationship"


def remove_user_role_by_id(user_id, role_id):
    user = get_user_by_id(user_id)
    rol = get_role_by_id(role_id)
    session = Session().object_session(user)
    if user is None:
        return "Failure"
    if rol is None:
        return "Failure"
    for rol in user.roles:
        if rol.id == role_id:
            session.add(user)
            user.roles.remove(rol)
            session.commit()
            return "Deleted"

    return "There is no such relationship"
