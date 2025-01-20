import OrdersTable from "../components/OrdersTable";
import OrderForm from "../components/OrderForm";
import { useState } from "react";

const OrdersPage = () => {
  const [isAddingOrder, setIsAddingOrder] = useState(false);

  // TODO: make order form a modal?

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Orders Page</h1>

      {isAddingOrder ? (
        <OrderForm setDone={(isDone) => setIsAddingOrder(!isDone)} />
      ) : (
        <OrdersTable />
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
