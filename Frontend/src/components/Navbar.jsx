import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { logout } from "../api/auth";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      alert("Logout failed", error);
    }
  };

  return (
    <nav
      style={{
        backgroundColor: "#3b82f6",
        padding: "1rem",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "1.25rem",
          textDecoration: "none",
        }}
      >
        OMS
      </Link>
      {user ? (
        <div>
          <span style={{ marginRight: "1rem" }}>Hello, {user.name}</span>
          <button
            onClick={handleLogout}
            style={{
              cursor: "pointer",
              background: "white",
              color: "#3b82f6",
              borderRadius: "4px",
              padding: "0.3rem 1rem",
              border: "none",
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login" style={{ color: "white" }}>
          Login
        </Link>
      )}
    </nav>
  );
}
