import api from "./axios";

export const registerUser = (payload) =>
  api.post("/users/register", payload).then((res) => res.data);

export const loginUser = (payload) =>
  api.post("/users/login", payload).then((res) => res.data);

export const getCurrentUser = () =>
  api.get("/users/me").then((res) => res.data.user);

export const getAllUsers = () => api.get("/users").then((res) => res.data);

export const getUserById = (id) =>
  api.get(`/users/${id}`).then((res) => res.data);

export const updateUser = (id, payload) =>
  api.put(`/users/${id}`, payload).then((res) => res.data);

export const deleteUser = (id) =>
  api.delete(`/users/${id}`).then((res) => res.data);

export const logoutUser = () =>
  api.post("/users/logout").then((res) => res.data);
