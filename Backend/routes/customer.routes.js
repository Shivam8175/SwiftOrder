import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
} from "../controllers/customer.controller.js";
import Auth from "../middlewares/auth.js";

const CustomerRouter = express.Router();

CustomerRouter.post("/add", Auth, createCustomer);
CustomerRouter.get("/getAll", Auth, getAllCustomers);
CustomerRouter.get("/getById/:id", Auth, getCustomerById);
CustomerRouter.patch("/update/:id", Auth, updateCustomer);
CustomerRouter.delete("/delete/:id", Auth, deleteCustomer);

export default CustomerRouter;
