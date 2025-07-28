import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav style={{ marginTop: 20 }}>
        <ul>
          <li>
            <Link to="/admin/products">Manage Products</Link>
          </li>
          <li>
            <Link to="/admin/orders">Manage Orders</Link>
          </li>
          <li>
            <Link to="/admin/customers">Manage Customers</Link>
          </li>
          <li>
            <Link to="/admin/users">Manage Users</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
