from sqlalchemy import Column, String, Integer, Date, Table, ForeignKey
from sqlalchemy.orm import relationship

from base.sql_base import Base


user_roles_relationship = Table(
    'user_roles', Base.metadata,
    Column('id_user', ForeignKey('users.id'), primary_key = True),
    Column('id_role', ForeignKey('roles.id'), primary_key=True),
    extend_existing=True
)

