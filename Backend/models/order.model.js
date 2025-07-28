import mongoose from "mongoose";
const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    items: [OrderItemSchema],
    status: {
      type: String,
      enum: ["PENDING", "PAID", "FULFILLED", "CANCELLED"],
      default: "PENDING",
    },
    paymentCollected: { type: Boolean, default: false },
    timestamps: {
      placedAt: Date,
      paidAt: Date,
      fulfilledAt: Date,
      cancelledAt: Date,
    },
  },
  { timestamps: true }
);

OrderSchema.index({ status: 1 });
OrderSchema.index({ customer: 1, createdAt: -1 });

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
