import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";

import AuthGuard from "./components/AuthGuard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import AdminDashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Customers from "./pages/admin/Customers";
import Users from "./pages/admin/Users";

import OrderLookup from "./pages/customer/OrderLookup";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders/lookup" element={<OrderLookup />} />
          <Route
            path="/admin"
            element={
              <AuthGuard>
                <AdminDashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AuthGuard>
                <Products />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AuthGuard>
                <Orders />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/customers"
            element={
              <AuthGuard>
                <Customers />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AuthGuard>
                <Users />
              </AuthGuard>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
