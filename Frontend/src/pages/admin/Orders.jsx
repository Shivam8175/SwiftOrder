import React, { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus, deleteOrder } from "../../api/order";
import OrderStatusBadge from "../../components/OrderStatusBadge";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    getAllOrders()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      loadOrders();
    } catch {
      alert("Failed to update order status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await deleteOrder(id);
      loadOrders();
    } catch {
      alert("Failed to delete order");
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#3b82f6", color: "white" }}>
              <th style={{ padding: 8 }}>Order ID</th>
              <th style={{ padding: 8 }}>Customer</th>
              <th style={{ padding: 8 }}>Status</th>
              <th style={{ padding: 8 }}>Payment Collected</th>
              <th style={{ padding: 8 }}>Placed At</th>
              <th style={{ padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: 8 }}>{order._id}</td>
                <td style={{ padding: 8 }}>{order.customer?.name || "N/A"}</td>
                <td style={{ padding: 8 }}>
                  <OrderStatusBadge status={order.status} />
                </td>
                <td style={{ padding: 8 }}>
                  {order.paymentCollected ? "Yes" : "No"}
                </td>
                <td style={{ padding: 8 }}>
                  {new Date(order.timestamps?.placedAt).toLocaleString()}
                </td>
                <td style={{ padding: 8 }}>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    style={{ marginRight: 8 }}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PAID">PAID</option>
                    <option value="FULFILLED">FULFILLED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                  <button
                    onClick={() => handleDelete(order._id)}
                    style={{ cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
