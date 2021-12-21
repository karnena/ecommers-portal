from typing import List, Optional, Text
from pydantic import BaseModel
from sqlalchemy.sql.sqltypes import TEXT,INTEGER



class UserBase(BaseModel):
    email: str


class User(UserBase):
    user_name: str
    email: str
    password: str
    class Config:
        orm_mode = True
        
class Data(BaseModel):
    user_name: str
    password: str
    class Config:
        orm_mode = True
class Token(BaseModel):
    jwt_token:str
    class Config:
        orm_mode = True


class TokenData(BaseModel):
    username: Optional[str] = None
    class Config:
        orm_mode = True

class ProductData(BaseModel):
    product_name : str
    image_url : str
    rating : str
    price : str
    
    class Config:
        orm_mode = True

class FavouriteData(BaseModel):
    user_name: str
    product_name : str
    image_url : str
    price : str
    rating : str
    class Config:
        orm_mode = True
class DeleteData(BaseModel):
    product_name: str
    class Config:
        orm_mode = True

class HistoryData(BaseModel):
    user_id : int
    created_on : str 
    created_by : str 
    detail : str
    class Config:
        orm_mode = True
