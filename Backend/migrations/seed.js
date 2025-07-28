import mongoose from "mongoose";
import connectDB from "../configs/mongodb.config";
import dotenv from "dotenv";
dotenv.config();

const DEMO_PRODUCTS = [
  {
    name: "Wireless Mouse",
    description: "Ergonomic mouse",
    price: 35,
    stock: 100,
  },
  {
    name: "USB Keyboard",
    description: "Mechanical keys",
    price: 60,
    stock: 80,
  },
  {
    name: "Laptop Stand",
    description: "Aluminum stand",
    price: 45,
    stock: 150,
  },
  {
    name: 'Monitor 24"',
    description: "Full HD display",
    price: 120,
    stock: 40,
  },
  { name: "USB-C Cable", description: "1m braided", price: 10, stock: 200 },
];

const DEMO_CUSTOMERS = [
  { name: "Alice Johnson", email: "alice@example.com", address: "123 Main St" },
  { name: "Bob Smith", email: "bob@example.com", address: "456 Park Ave" },
  { name: "Carol White", email: "carol@example.com", address: "789 Oak Rd" },
];

async function seed() {
  try {
    await connectDB();

    console.log("Clearing old data...");
    await Product.deleteMany({});
    await Customer.deleteMany({});

    console.log("Seeding demo products...");
    const products = await Product.insertMany(DEMO_PRODUCTS);
    console.log(`Seeded ${products.length} products.`);

    console.log("Seeding demo customers...");
    const customers = await Customer.insertMany(DEMO_CUSTOMERS);
    console.log(`Seeded ${customers.length} customers.`);

    console.log("Seed completed successfully.");
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
}

seed();
