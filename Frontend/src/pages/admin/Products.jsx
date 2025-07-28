import React, { useState, useEffect } from "react";
import {
  getAllProducts,
  createProduct,
  deleteProduct,
} from "../../api/product";
import ProductImageUploader from "../../components/ProductImageUploader";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    getAllProducts().then(setProducts).catch(console.error);
  };

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) {
      alert("All fields required");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      if (image) formData.append("image", image);
      await createProduct(formData);
      setForm({ name: "", price: "", stock: "" });
      setImage(null);
      loadProducts();
    } catch (err) {
      alert("Failed to create product", err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch {
      alert("Failed to delete product");
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ marginRight: 8 }}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          style={{ marginRight: 8 }}
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
          style={{ marginRight: 8 }}
        />
        <ProductImageUploader onImage={setImage} />
        <button type="submit" disabled={loading} style={{ marginLeft: 8 }}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#3b82f6", color: "white" }}>
            <th style={{ padding: 8 }}>Name</th>
            <th style={{ padding: 8 }}>Price</th>
            <th style={{ padding: 8 }}>Stock</th>
            <th style={{ padding: 8 }}>Image</th>
            <th style={{ padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={{ padding: 8 }}>{p.name}</td>
              <td style={{ padding: 8 }}>${p.price.toFixed(2)}</td>
              <td style={{ padding: 8 }}>{p.stock}</td>
              <td style={{ padding: 8 }}>
                {p.imageUrl && (
                  <img src={p.imageUrl} alt={p.name} height={40} />
                )}
              </td>
              <td style={{ padding: 8 }}>
                <button
                  onClick={() => handleDelete(p._id)}
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: 8, textAlign: "center" }}>
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
