import OrdersTable from "../components/OrdersTable";
import OrderForm from "../components/OrderForm";
import { useEffect, useState } from "react";
import orderApiService from "../api/orderApi";

const OrdersPage = () => {
  const [isAddingOrder, setIsAddingOrder] = useState(false);
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
  }, []);

  if (loading) {
    return <div>Loading Orders...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error occured: {error}</p>{" "}
        <button onClick={() => setError("")}>Retry</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Orders Page</h1>

      {isAddingOrder ? (
        <OrderForm setDone={(isDone) => setIsAddingOrder(!isDone)} />
      ) : (
        <OrdersTable orders={orders} handleDelete={handleDelete} />
      )}

      <button
        className="border-2 rounded-xl p-4"
        onClick={() => setIsAddingOrder(!isAddingOrder)}
      >
        {isAddingOrder ? "Cancel" : "Add Order"}
      </button>
    </div>
  );
};

export default OrdersPage;
