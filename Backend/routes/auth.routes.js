import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  logout,
  registerUser,
  updateUser,
} from "../controllers/auth.controller.js";
import Auth from "../middlewares/auth.js";
import rbac from "../middlewares/rbac.js";

const UserRouter = express.Router();

UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.get("/logout", logout);
UserRouter.get("/getAll", Auth, rbac("admin"), getAllUsers);
UserRouter.get("/getById/:id", Auth, rbac("admin"), getUserById);
UserRouter.patch("/update/:id", Auth, rbac("admin"), updateUser);
UserRouter.delete("/delete/:id", Auth, rbac("admin"), deleteUser);

export default UserRouter;
