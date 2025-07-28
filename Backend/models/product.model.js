import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String },
    imagePublicId: { type: String },
  },
  { timestamps: true }
);
const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductSchema;
