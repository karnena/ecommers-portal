# from typing import Text
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
# from sqlalchemy.sql.sqltypes import TEXT

from sharedlibrary.database import Base


class Favourite(Base): 
    __tablename__ = "favourites"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user_detail.id'))
    product_id = Column(Integer, ForeignKey('product_detail.id')) 
    user = relationship("User", back_populates="products")
    product = relationship("Product", back_populates="users")
class User(Base):
    __tablename__ = "user_detail"
    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String)
    email = Column(String)
    password = Column(String)
    products = relationship('Favourite', back_populates='user')
class Product(Base):
    __tablename__ = "product_detail"
    id=Column(Integer, primary_key=True, index=True)
    product_name = Column(String)
    image_url = Column(String) 
    price = Column(String)
    rating = Column(String)
    users = relationship('Favourite', back_populates='product')

# class Favourite(Base):
#     __tablename__ = "favorites"

#     id=Column(Integer, primary_key=True, index=True)
#     user_name = Column(String)
#     product_name = Column(String)
#     image_url = Column(String)
#     price = Column(String)
#     rating = Column(String)

# class Favourite(Base): 
#     __tablename__ = "favourites"
#     id = Column(Integer, primary_key=True)
#     user_id = Column(Integer, ForeignKey('user_details.id'))
#     product_id = Column(Integer, ForeignKey('product_details.id')) 
#     user = relationship("User", back_populates="projects")
#     product = relationship("Project", back_populates="users")