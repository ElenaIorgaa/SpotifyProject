from models.role_orm import Role
from base.sql_base import Session


def get_roles():
    session = Session()
    roles = session.query(Role).all()
    return roles


def get_role_by_id(role_id):
    session = Session()
    return session.query(Role).get(role_id)


def get_role_by_value(value):
    roles = get_roles()
    for role in roles:
        if role.value == value:
            return role

def add_new_role(value):
    session = Session()
    role = Role(value)
    #try:
    session.add(role)

    #except Exception as exc:
    #    print(f"Failed to add role - {exc}")

    session.commit()

