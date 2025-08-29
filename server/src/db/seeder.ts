import mongoose from "mongoose";
import { products } from "./data";
import { Product } from "../models/product";

async function seed() {
  try {
    await mongoose.connect("mongodb://localhost:27017/fash-project");
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("✅ Products seeded!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
