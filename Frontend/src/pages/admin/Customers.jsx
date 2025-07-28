import React, { useEffect, useState } from "react";
import {
  getAllCustomers,
  createCustomer,
  deleteCustomer,
} from "../../api/customer";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    getAllCustomers().then(setCustomers).catch(console.error);
  };

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Name and email are required");
      return;
    }
    try {
      await createCustomer(form);
      setForm({ name: "", email: "", address: "", phone: "" });
      loadCustomers();
    } catch (err) {
      alert("Failed to create customer", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;
    try {
      await deleteCustomer(id);
      loadCustomers();
    } catch {
      alert("Failed to delete customer");
    }
  };

  return (
    <div>
      <h2>Customers</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <button type="submit">Add Customer</button>
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#3b82f6", color: "white" }}>
            <th style={{ padding: 8 }}>Name</th>
            <th style={{ padding: 8 }}>Email</th>
            <th style={{ padding: 8 }}>Address</th>
            <th style={{ padding: 8 }}>Phone</th>
            <th style={{ padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c._id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={{ padding: 8 }}>{c.name}</td>
              <td style={{ padding: 8 }}>{c.email}</td>
              <td style={{ padding: 8 }}>{c.address}</td>
              <td style={{ padding: 8 }}>{c.phone}</td>
              <td style={{ padding: 8 }}>
                <button onClick={() => handleDelete(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {customers.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: 8, textAlign: "center" }}>
                No customers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
