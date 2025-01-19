import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import orderApiService from "../api/orderApi";

const OrderForm = () => {
  const { register, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const fetchedSuppliers = await orderApiService.getAllSuppliers();
        const fetchedDepartments = await orderApiService.getAllDepartments();

        setSuppliers(fetchedSuppliers);
        setDepartments(fetchedDepartments);
      } catch (err) {
        setError(err.message || "Failed to fetch from API service");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <div>
            <h1 className="text-2xl font-semibold text-center">Order Form</h1>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <form onSubmit={handleSubmit((data) => console.log(data))}>
                <div className="mb-4">
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name:
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    placeholder="Full name"
                    {...register("fullname")}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="total_cost"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Total Cost:
                  </label>
                  <input
                    type="number"
                    id="total_cost"
                    placeholder="Total cost"
                    {...register("total_cost")}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Department:
                  </label>
                  <select
                    id="department"
                    {...register("department")}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="">Select a department</option>
                    {departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="supplier"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Supplier:
                  </label>
                  <select
                    id="supplier"
                    {...register("supplier")}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="">Select a supplier</option>
                    {suppliers.map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="reason_for_order"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Reason For Order:
                  </label>
                  <textarea
                    id="reason_for_order"
                    placeholder="Reason for order"
                    {...register("reason_for_order")}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    rows={3}
                  />
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
