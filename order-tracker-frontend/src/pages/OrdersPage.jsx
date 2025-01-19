import { useNavigate } from "react-router-dom";
import OrdersTable from "../components/OrdersTable";

const OrdersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Orders Page</h1>
      <OrdersTable />

      <button
        className="border-2 rounded-xl p-4"
        onClick={() => navigate("/order-form")}
      >
        Add Order
      </button>
    </div>
  );
};

export default OrdersPage;
