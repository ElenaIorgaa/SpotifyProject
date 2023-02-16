from sqlalchemy import Boolean, true, false

from models.user_orm import User
from base.sql_base import Session


def get_users():
    session = Session()
    users = session.query(User).all()
    return users


def create_user(username, password):
    session = Session()
    user = User(username, password, True)
    try:
        session.add(user)
        session.commit()
    except Exception as exc:
        print(f"Failed to add user - {exc}")
        session.rollback()
    return user


def get_user_by_id(id):
    session = Session()
    user = session.get(User, id)
    return user


def get_user_by_name(username):
    session = Session()
    users = get_users()
    for user in users:
        if user.username == username:
            return user


def modify_password(id, password):
    user = get_user_by_id(id)
    session = Session().object_session(user)
    #session.expunge(user)
    user.password = password
    #session.add(user)
    session.commit()
    return user


def modify_username(id, new_username):
    session = Session()
    user = session.query(User).get(id)
    user.username = new_username
    session.commit()
    return user


def validate_user(id):
    session = Session()
    entry = session.query(User).get(id)
    entry.validated = 1
    session.commit()


def invalidate_user(id):
    session = Session()
    entry = session.query(User).get(id)
    entry.validated = 0
    session.commit()
