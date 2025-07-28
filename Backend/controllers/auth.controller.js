import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }
    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name,
      email,
      password: hash,
      role: role,
    });
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "").json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error occurred during logout:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json({
      users,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get users", error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to get user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const updateFields = { name, email, role };
    if (req.body.password) {
      updateFields.password = await bcrypt.hash(req.body.password, 10);
    }
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      updateFields,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};
