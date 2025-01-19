from typing import List

from fastapi import FastAPI, HTTPException, status
from sqlalchemy.orm import joinedload

from database import DepartmentTable, OrderTable, SessionDep, SupplierTable
from models import Department, Order, OrderCreate, Supplier

app = FastAPI()


@app.get("/ping")
def ping():
    return {"response": "pong"}


@app.get("/orders", response_model=List[Order])
def get_all_orders(db: SessionDep):
    orders = (
        db.query(OrderTable)
        .options(joinedload(OrderTable.department), joinedload(OrderTable.supplier))
        .all()
    )

    return orders


@app.post("/orders", status_code=status.HTTP_201_CREATED, response_model=Order)
def create_order(order: OrderCreate, db: SessionDep):
    db_order = OrderTable(**order.model_dump())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    return db_order


@app.get("/orders/{order_id}", response_model=Order)
def get_order(order_id: int, db: SessionDep):
    order = (
        db.query(OrderTable)
        .options(joinedload(OrderTable.department), joinedload(OrderTable.supplier))
        .filter(OrderTable.id == order_id)
        .first()
    )
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@app.put("/orders/{order_id}", response_model=Order)
def update_order(order_id: int, order_update: OrderCreate, db: SessionDep):
    db_order = db.query(OrderTable).filter(OrderTable.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")

    for key, value in order_update.model_dump(exclude_unset=True).items():
        setattr(db_order, key, value)

    db.commit()
    db.refresh(db_order)
    return db_order


@app.delete("/orders/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_order(order_id: int, db: SessionDep):
    order = db.query(OrderTable).filter(OrderTable.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    db.delete(order)
    db.commit()
    return


@app.get("/departments", response_model=List[Department])
def get_all_departments(db: SessionDep):
    departments = db.query(DepartmentTable).all()
    return departments


# @app.post(
#     "/departments", status_code=status.HTTP_201_CREATED, response_model=Department
# )
# def create_department(department: DepartmentCreate, db: SessionDep):
#     db_department = DepartmentTable(**department.model_dump())
#     db.add(db_department)
#     db.commit()
#     db.refresh(db_department)
#     return Department.model_validate(db_department)


@app.get("/suppliers", response_model=List[Supplier])
def get_all_suppliers(db: SessionDep):
    suppliers = db.query(SupplierTable).all()
    return suppliers


# @app.post("/suppliers", status_code=status.HTTP_201_CREATED, response_model=Supplier)
# def create_supplier(supplier: SupplierCreate, db: SessionDep):
#     db_supplier = SupplierTable(**supplier.model_dump())
#     db.add(db_supplier)
#     db.commit()
#     db.refresh(db_supplier)
#     return Supplier.model_validate(db_supplier)
