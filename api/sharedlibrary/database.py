from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

SQLALCHEMY_DATABASE_URL = "postgresql://postgres:admin123@localhost/postgres"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# with engine1.connect() as conn_lite:
#     with engine.connect() as conn_cloud:
#         for table in Base.metadata.sorted_tables:
#             data = [dict(row) for row in conn_lite.execute(select(table.c))]
#             conn_cloud.execute(table.insert().values(data))

# engine1 = create_engine(
#     SQLALCHEMY_DATABASE_URL1
# )

# SQLALCHEMY_DATABASE_URL = "sqlite:///./main.db"