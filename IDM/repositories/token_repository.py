from datetime import datetime

from base.sql_base import Session
from models.token_orm import Token


def get_tokens():
    session = Session()
    roles = session.query(Token).all()
    return roles


def get_db_token(token):
    session = Session()
    return session.query(Token).get(token)


def add_new_token(token):
    session = Session()
    tkn = Token(token, 0)
    session.add(tkn)
    session.commit()

def delete_all_invalid_tokens():
    session = Session()
    tokens = session.query(Token).all()
    for token in tokens:
        if(token.expired==1):
            session.delete(token)
    session.commit()

def delete_all_expired_tokens(SECRET_KEY, ALGORITHM):
    session = Session()
    tokens = session.query(Token).all()
    for token in tokens:
        exp = token.decode(token, SECRET_KEY, ALGORITHM, options={"verify_signature": False})["exp"]
        expiry_time = datetime.utcfromtimestamp(exp)
        if (datetime.utcnow() > expiry_time):
            session.delete(token)
    session.commit()

def invalidate_token(token):
    session = Session()
    entry = session.query(Token).get(token)
    entry.expired = 1
    session.commit()
