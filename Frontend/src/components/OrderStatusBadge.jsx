import React from "react";

const colors = {
  PENDING: "#f59e0b",
  PAID: "#3b82f6",
  FULFILLED: "#10b981",
  CANCELLED: "#ef4444",
};

export default function OrderStatusBadge({ status }) {
  const color = colors[status] || "#6b7280";
  return (
    <span
      style={{
        backgroundColor: color,
        color: "white",
        borderRadius: "12px",
        padding: "0.15rem 0.85rem",
        fontWeight: "600",
        fontSize: "0.85rem",
        textTransform: "uppercase",
        minWidth: 80,
        display: "inline-block",
        textAlign: "center",
      }}
    >
      {status}
    </span>
  );
}
