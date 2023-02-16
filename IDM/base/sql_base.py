from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()
engine = create_engine('mariadb+mariadbconnector://dbadmin:admin@localhost:3306/idm')
Session = sessionmaker(bind=engine)
