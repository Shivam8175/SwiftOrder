import CustomerModel from "../models/customer.model.js";

export const createCustomer = async (req, res) => {
  try {
    const { name, email, address, phone } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }
    const existing = await CustomerModel.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ message: "Customer with this email already exists." });
    }
    const customer = await CustomerModel.create({
      name,
      email,
      address,
      phone,
    });
    res.status(201).json(customer);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create customer", error: err.message });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await CustomerModel.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Failed to get customers" });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await CustomerModel.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: "Failed to get customer" });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { name, email, address, phone } = req.body;
    const customer = await CustomerModel.findByIdAndUpdate(
      req.params.id,
      { name, email, address, phone },
      { new: true, runValidators: true }
    );
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update customer", error: err.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await CustomerModel.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete customer" });
  }
};
