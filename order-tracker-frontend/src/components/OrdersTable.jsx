import { useEffect, useState } from "react";
import orderApiService from "../api/orderApi";
import OrderRow from "./OrderRow";

const OrdersTable = () => {
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
    <div className="container mx-auto p-4">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Full Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Total Cost
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Department
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Supplier
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Reason
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <OrderRow order={order} handleDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
