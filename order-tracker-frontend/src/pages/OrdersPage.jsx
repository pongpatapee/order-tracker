import OrdersTable from "../components/OrdersTable";
import OrderForm from "../components/OrderForm";
import { useEffect, useState } from "react";
import orderApiService from "../api/orderApi";

let renderCount = 0;

const OrdersPage = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [orderEdit, setOrderEdit] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async (orderId) => {
    try {
      // api stuff
      const response = await orderApiService.deleteOrder(orderId);

      if (response.status != 204) {
        throw new Error(`Failed to delete order ${orderId}`);
      }

      // state stuff
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (err) {
      setError(err.message);
    }
  };

  console.log(++renderCount);
  console.log("orderEdit: ", orderEdit);

  const handleEdit = async (order) => {
    setIsEditing(true);
    setOrderEdit(order);
  };

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleRestAddEdit = () => {
    setIsAdding(false);
    setIsEditing(false);
    setOrderEdit(null);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const fetchedOrders = await orderApiService.getAllOrders();
        setOrders(fetchedOrders);
      } catch (err) {
        setError(err.message || "Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAdding, isEditing]);

  if (loading) {
    return <div>Loading Orders...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error occured: {error}</p>
        <button onClick={() => setError("")}>Retry</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Orders Page</h1>

      {isAdding || isEditing ? (
        <OrderForm order={orderEdit} handleCleanUp={handleRestAddEdit} />
      ) : (
        <OrdersTable
          orders={orders}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}

      <button
        className="border-2 rounded-xl p-4"
        onClick={isAdding || isEditing ? handleRestAddEdit : handleAdd}
      >
        {isAdding || isEditing ? "Cancel" : "Add Order"}
      </button>
    </div>
  );
};

export default OrdersPage;
