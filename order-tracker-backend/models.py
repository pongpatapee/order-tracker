from pydantic import BaseModel, ConfigDict


# TODO: integrate supplier and department
class Supplier(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str


class Department(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str


class OrderCreate(BaseModel):
    fullname: str
    total_cost: float
    department_id: int
    supplier_id: int
    reason_for_order: str


class Order(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    fullname: str
    total_cost: float
    department_id: int
    supplier_id: int
    reason_for_order: str


class OrderResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    fullname: str
    total_cost: float
    department: Department
    supplier: Supplier
    reason_for_order: str
