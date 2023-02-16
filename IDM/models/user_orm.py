from spyne import Any
from sqlalchemy import Column, String, Integer, Boolean
from base.sql_base import Base
from sqlalchemy.orm import relationship

from models.users_roles_orm import user_roles_relationship


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String)
    password = Column(String)
    validated = Column(Boolean)
    #roles = relationship("Role", secondary=user_roles_relationship, back_populates='users')
    roles = relationship("Role", secondary=user_roles_relationship)

    def __init__(self, username, password,validated, *args: Any, **kwargs: Any):
        super().__init__(*args, **kwargs)
        self.username = username
        self.password = password
        self.validated = validated

