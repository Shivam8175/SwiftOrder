import ProductModel from "../models/product.model.js";
import cloudinary from "../configs/cloudinary.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    if (!name || !price || stock == null) {
      return res
        .status(400)
        .json({ message: "Name, price, and stock are required." });
    }
    let imageUrl = "";
    let imagePublicId = "";
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "oms-images" }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          })
          .end(req.file.buffer);
      });
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    const product = await ProductModel.create({
      name,
      description,
      price,
      stock,
      imageUrl,
      imagePublicId,
    });

    res.status(201).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create product", error: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to get products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to get product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { name, description, price, stock },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update product", error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};
