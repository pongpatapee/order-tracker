import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

// Create an Axios instance
const orderApi = axios.create({
  baseURL: API_BASE_URL,
  // You can add other default configurations here, such as:
  // timeout: 1000, // Timeout in milliseconds
  // headers: {'X-Custom-Header': 'foobar'}
});

const orderApiService = {
  getAllOrders: async () => {
    try {
      const response = await orderApi.get("/orders"); // Use relative path
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  getOrderById: async (orderId) => {
    try {
      const response = await orderApi.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      throw error;
    }
  },

  createOrder: async (orderData) => {
    try {
      const response = await orderApi.post("/orders", orderData);
      return response;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  updateOrder: async (orderId, orderData) => {
    try {
      const response = await orderApi.patch(`/orders/${orderId}`, orderData);
      return response.data;
    } catch (error) {
      console.error(`Error updating order ${orderId}:`, error);
      throw error;
    }
  },

  deleteOrder: async (orderId) => {
    try {
      await orderApi.delete(`/orders/${orderId}`);
    } catch (error) {
      console.error(`Error deleting order ${orderId}:`, error);
      throw error;
    }
  },

  getAllDepartments: async () => {
    try {
      const response = await orderApi.get("/departments");
      return response.data;
    } catch (error) {
      console.error("Error fetching departments:", error);
      throw error;
    }
  },

  // createDepartment: async (departmentData) => {
  //     try {
  //         const response = await api.post('/departments', departmentData);
  //         return response.data;
  //     } catch (error) {
  //         console.error("Error creating department:", error);
  //         throw error;
  //     }
  // },

  getAllSuppliers: async () => {
    try {
      const response = await orderApi.get("/suppliers");
      return response.data;
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      throw error;
    }
  },

  // createSupplier: async (supplierData) => {
  //     try {
  //         const response = await api.post('/suppliers', supplierData);
  //         return response.data;
  //     } catch (error) {
  //         console.error("Error creating supplier:", error);
  //         throw error;
  //     }
  // },
};

export default orderApiService;
