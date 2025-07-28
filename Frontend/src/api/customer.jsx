import api from "./axios";

export const createCustomer = (payload) =>
  api.post("/customers", payload).then((res) => res.data);

export const getAllCustomers = () =>
  api.get("/customers").then((res) => res.data);

export const getCustomerById = (id) =>
  api.get(`/customers/${id}`).then((res) => res.data);

export const updateCustomer = (id, payload) =>
  api.put(`/customers/${id}`, payload).then((res) => res.data);

export const deleteCustomer = (id) =>
  api.delete(`/customers/${id}`).then((res) => res.data);
