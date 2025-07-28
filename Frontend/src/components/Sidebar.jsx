import React from "react";
import { NavLink } from "react-router-dom";

const linkStyle = {
  padding: "0.75rem 1rem",
  textDecoration: "none",
  color: "#374151",
  display: "block",
  borderRadius: "4px",
  marginBottom: "0.25rem",
};

const activeLinkStyle = {
  backgroundColor: "#3b82f6",
  color: "white",
};

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 220,
        backgroundColor: "#e5e7eb",
        padding: "1rem",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <nav>
        <NavLink
          to="/admin"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
          }
          end
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/products"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/admin/orders"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/admin/customers"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
          }
        >
          Customers
        </NavLink>
        <NavLink
          to="/admin/users"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
          }
        >
          Users
        </NavLink>
      </nav>
    </aside>
  );
}
