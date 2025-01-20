const OrderRow = ({ order, handleEdit, handleDelete }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {order.fullname}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {order.total_cost}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {order.department.name}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {order.supplier.name}
      </td>

      <td className="px-6 py-4 text-sm text-gray-900">
        {order.reason_for_order}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        <button
          className="p-2 rounded-lg bg-green-600 text-white mr-4"
          onClick={() => handleEdit(order)}
        >
          Edit
        </button>
        <button
          className="p-2 rounded-lg bg-red-600 text-white"
          onClick={() => handleDelete(order.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
