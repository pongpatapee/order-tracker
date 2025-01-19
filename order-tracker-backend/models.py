from pydantic import BaseModel


# TODO: integrate supplier and department
class Supplier(BaseModel):
    id: int
    name: str


class Department(BaseModel):
    id: int
    name: str


class OrderCreate(BaseModel):
    fullname: str
    total_cost: float
    department_id: int
    supplier_id: int
    reason_for_order: str


class Order(BaseModel):
    id: int
    fullname: str
    total_cost: float
    department_id: int
    supplier_id: int
    reason_for_order: str


class OrderResponse(BaseModel):
    id: int
    fullname: str
    total_cost: float
    department_name: str
    supplier_name: str
    reason_for_order: str
