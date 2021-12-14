from typing import List
import logging
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi import security
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from sharedlibrary import crud,models, schemas
from datetime import datetime, timedelta 
from sharedlibrary.database import SessionLocal, engine
from typing import Optional
from jose import JWTError, jwt
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer,OAuth2PasswordBearer, OAuth2PasswordRequestForm


models.Base.metadata.create_all(bind=engine)

logging.basicConfig(filename='example.log', encoding='utf-8', level=logging.DEBUG)



app = FastAPI()
origins = [
    "http://127.0.0.1:8000/login",
    "http://localhost:3000",
    "http://localhost",
    "http://127.0.0.1:8000/testing",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

    

pwd_context= CryptContext(schemes=["bcrypt"],deprecated='auto')
security = HTTPBearer()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/users_details/")
def read_users(db: Session = Depends(get_db)):
    logging.debug("watching")
    # users = crud.get_users(db, skip=skip, limit=limit)
    usersDetails = db.query(models.User).all()
    return usersDetails


@app.get("/users_details/{user_id}")
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id==user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user



# @app.get("/login")
# def read_item(user_name:str, password:str,db: Session = Depends(get_db)):
#     users = crud.get_users(db)
#     us = ''
#     ps= ''
#     for i in users:
#         if(i.user_name == user_name):
#             us = i.user_name
#             ps = i.password
#     if user_name == us:
#         if str(ps) == password:
#             payload_data = {"user_name": user_name}
#             encoded_jwt = jwt.encode(payload=payload_data, key="secreat")
#             s['auth'].append(encoded_jwt)
#             return("login success", encoded_jwt)
#         else:
#             return("username and password not matched")

#     else:
#         return("login error")

@app.post('/signup')
def create_user(request:schemas.User,db: Session = Depends(get_db)):
    logging.debug(request)
    hashedPassword=pwd_context.hash(request.password)
    new_user=models.User(user_name=request.user_name, email=request.email,password=hashedPassword)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

class LoginRequest(BaseModel):
    user_name: str
    password: str

@app.post('/login')
def login(request:LoginRequest,db:Session= Depends(get_db)):
    logging.info(request)
    current_user=db.query(models.User).filter(models.User.user_name == request.user_name).first()
    if not current_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail = f'No user found with this {request.user_name} username')
    hashedPassword = current_user.password
    
    is_valid=pwd_context.verify(request.password, hashedPassword)
    if is_valid:
        access_token = create_access_token(data={"user_name": current_user.user_name})
        return{"access_token":access_token, "token_type":"bearer"}
        
    return "user not found"


@app.post('/product')
def create(request: schemas.ProductData,db:Session = Depends(get_db)):
    new_product = models.Product(product_name = request.product_name, image_url = request.image_url, price = request.price, rating= request.rating)
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product


@app.get('/product')
def get_product(db: Session = Depends(get_db)):
    productDetails = db.query(models.Product).all()
    return productDetails



@app.get('/testing')
# async def test(credentials: HTTPAuthorizationCredentials = Depends(security)):
async def test(token: jwt = Depends(oauth2_scheme)):
    # payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    
    # return payload
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("user_name")
        return username
    except:
        return(token)



@app.post("/favourite")
def create(request:schemas.FavouriteData,db:Session=Depends(get_db),token: jwt = Depends(oauth2_scheme)):
    
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    username: str = payload.get("user_name")
    
    add_fav= models.Favourite(user_name=username,product_name=request.product_name,image_url=request.image_url,price=request.price,rating=request.rating)
    db.add(add_fav)
    db.commit()
    db.refresh(add_fav)
    return add_fav

@app.get("/favourite")
def get_fav(db:Session=Depends(get_db)):
    favourites=db.query(models.Favourite).all()
    return favourites


@app.get('/user/favourite')
def get_fav(token: jwt = Depends(oauth2_scheme),db:Session=Depends(get_db)):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    username: str = payload.get("user_name")
    fav = db.query(models.Favourite).filter(models.Favourite.user_name == username).all()
    return fav





























# class Data(BaseModel):
#     user: str


# @app.post("/test")
# def main(data: Data):
#     logging.debug(data)
#     return data


# @app.post("/user")
# def get_current_user(token: schemas.Token, db:Session= Depends(get_db)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#         token_data = schemas.TokenData(username=username)
#     except JWTError:
#         raise credentials_exception
#     user = db.query(models.User).filter(models.User.user_name == token_data.username)
#     if user is None:
#         raise credentials_exception
#     return user