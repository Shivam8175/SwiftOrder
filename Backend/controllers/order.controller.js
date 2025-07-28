import OrderModel from "../models/order.model.js";
import { exportOrdersToCSV as csvExport } from "../utils/csvExport.js";
import { broadcastOrderUpdate } from "../utils/orderStatus.ws.js";

export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order items are required." });
    }
    const order = await OrderModel.create({
      customer: req.user._id,
      items,
      status: "PENDING",
      timestamps: { placedAt: new Date() },
      paymentCollected: false,
    });
    broadcastOrderUpdate(order);
    return res.status(201).json(order);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to create order", error: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("customer")
      .populate("items.product");
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: "Failed to get orders" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id)
      .populate("customer")
      .populate("items.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.json(order);
  } catch (err) {
    return res.status(500).json({ message: "Failed to get order" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["PENDING", "PAID", "FULFILLED", "CANCELLED"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = status;
    if (status === "PAID") {
      order.timestamps.paidAt = new Date();
      order.paymentCollected = true;
    } else if (status === "FULFILLED") {
      order.timestamps.fulfilledAt = new Date();
    } else if (status === "CANCELLED") {
      order.timestamps.cancelledAt = new Date();
      order.paymentCollected = false;
    }
    await order.save();
    broadcastOrderUpdate(order);
    return res.json(order);
  } catch (err) {
    return res.status(500).json({ message: "Failed to update order status" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.json({ message: "Order deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to delete order" });
  }
};

export const getOrderItems = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id).populate(
      "items.product"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.json(order.items);
  } catch (err) {
    return res.status(500).json({ message: "Failed to get order items" });
  }
};

export const exportOrdersToCSV = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("customer")
      .populate("items.product");
    const csvData = await csvExport(orders);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="orders.csv"');
    res.status(200).send(csvData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to export orders", error: err.message });
  }
};
