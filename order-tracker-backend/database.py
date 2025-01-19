from typing import Annotated

from fastapi import Depends
from sqlalchemy import Column, Float, ForeignKey, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, relationship, sessionmaker

DATABASE_URL = "sqlite:///./data/order_tracker.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)  # Important for FastAPI

Base = declarative_base()


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


SessionDep = Annotated[Session, Depends(get_db)]


def create_db_and_tables():
    Base.metadata.create_all(bind=engine)


class DepartmentTable(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    orders = relationship("OrderTable", back_populates="department")


class SupplierTable(Base):
    __tablename__ = "suppliers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    orders = relationship("OrderTable", back_populates="supplier")


class OrderTable(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String, index=True)
    total_cost = Column(Float)
    department_id = Column(Integer, ForeignKey("departments.id"))
    supplier_id = Column(Integer, ForeignKey("suppliers.id"))
    reason_for_order = Column(String)

    department = relationship("DepartmentTable", back_populates="orders")
    supplier = relationship("SupplierTable", back_populates="orders")


if __name__ == "__main__":
    create_db_and_tables()
