import express from "express";
import rbac from "../middlewares/rbac.js";
import {
  createOrder,
  deleteOrder,
  exportOrdersToCSV,
  getAllOrders,
  getOrderById,
  getOrderItems,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import Auth from "../middlewares/auth.js";
const OrderRouter = express.Router();

OrderRouter.get("/getAll", Auth, rbac("admin"), getAllOrders);
OrderRouter.post("/add", Auth, createOrder);
OrderRouter.get("/getById/:id", Auth, getOrderById);
OrderRouter.put("/updateStatus/:id", Auth, updateOrderStatus);
OrderRouter.post("/export/csv", Auth, rbac("admin"), exportOrdersToCSV);
OrderRouter.delete("/delete/:id", Auth, rbac("admin"), deleteOrder);
OrderRouter.get("/getOrderItems/:id", Auth, getOrderItems);

export default OrderRouter;
