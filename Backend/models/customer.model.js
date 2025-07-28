import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

const CustomerModel = mongoose.model("Customer", CustomerSchema);
export default CustomerModel;
