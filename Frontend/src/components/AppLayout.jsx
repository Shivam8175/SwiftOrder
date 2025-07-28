import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
  return (
    <div
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      <Navbar />
      <div style={{ flex: 1, display: "flex" }}>
        <Sidebar />
        <main
          style={{ flexGrow: 1, padding: "1rem", backgroundColor: "#f9fafb" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
