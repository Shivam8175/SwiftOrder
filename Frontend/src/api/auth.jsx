import api from "./axios";

export const login = (payload) =>
  api.post("/users/login", payload).then((res) => res.data);

export const register = (payload) =>
  api.post("/users/register", payload).then((res) => res.data);

export const getMe = () => api.get("/users/me").then((res) => res.data.user);

export const logout = () => api.post("/users/logout").then((res) => res.data);
