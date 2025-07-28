import express from "express";
import upload from "../middlewares/upload.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller.js";
import Auth from "../middlewares/auth.js";
const ProductRouter = express.Router();

ProductRouter.post("/add", Auth, upload.single("image"), createProduct);
ProductRouter.get("/getAll", getAllProducts);
ProductRouter.get("/getById/:id", getProductById);
ProductRouter.patch("/update/:id", Auth, upload.single("image"), updateProduct);
ProductRouter.delete("/delete/:id", Auth, deleteProduct);

export default ProductRouter;
