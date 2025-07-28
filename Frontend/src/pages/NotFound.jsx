import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>404 - Not Found</h1>
      <p>
        Go <Link to="/">Home</Link>
      </p>
    </div>
  );
}
