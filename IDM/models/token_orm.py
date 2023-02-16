from sqlalchemy import Column, String, Boolean
from spyne import Any

from base.sql_base import Base


class Token(Base):
    __tablename__ = 'tokens'

    token = Column(String, primary_key=True)
    expired = Column(Boolean)
    #users = relationship("Association", back_populates='role')

    def __init__(self, token, expired, *args: Any, **kwargs: Any):
        super().__init__(*args, **kwargs)
        self.token = token
        self.expired = expired