from typing import Any

from sqlalchemy import Column, String, Integer

from base.sql_base import Base

class Role(Base):
    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True)
    value = Column(String)

    def __init__(self, value, *args: Any, **kwargs: Any):
        super().__init__(*args, **kwargs)
        self.value = value
