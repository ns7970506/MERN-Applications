require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./model/User");
const Product = require("./model/Product");
const Order = require("./model/Order");

const seedDatabase = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    const password = await bcrypt.hash("Password@123", 10);

    const admin = await User.findOneAndUpdate(
      { email: "admin@shopkaro.demo" },
      { name: "ShopKaro Admin", email: "admin@shopkaro.demo", password, role: "admin", verified: true },
      { new: true, upsert: true, runValidators: true }
    );
    const customer = await User.findOneAndUpdate(
      { email: "customer@shopkaro.demo" },
      { name: "Demo Customer", email: "customer@shopkaro.demo", password, role: "user", verified: true },
      { new: true, upsert: true, runValidators: true }
    );

    const productData = [
      { name: "Wireless Headphones", description: "Bluetooth over-ear headphones with clear sound.", price: 2499, category: "Electronics", stock: 18, imageUrl: "https://placehold.co/600x400?text=Wireless+Headphones", ratings: 4.4, numOfReviews: 27 },
      { name: "Cotton Casual T-Shirt", description: "Comfortable regular-fit cotton t-shirt.", price: 699, category: "Fashion", stock: 45, imageUrl: "https://placehold.co/600x400?text=Casual+T-Shirt", ratings: 4.1, numOfReviews: 16 },
      { name: "Steel Water Bottle", description: "Insulated stainless-steel water bottle, 750 ml.", price: 899, category: "Home & Kitchen", stock: 30, imageUrl: "https://placehold.co/600x400?text=Water+Bottle", ratings: 4.6, numOfReviews: 39 },
    ];

    const products = await Promise.all(
      productData.map((data) => Product.findOneAndUpdate(
        { name: data.name }, data, { new: true, upsert: true, runValidators: true }
      ))
    );

    await Order.findOneAndUpdate(
      { paymentId: "demo-payment-001" },
      {
        user: customer._id,
        items: [
          { productId: products[0]._id, quantity: 1, price: products[0].price },
          { productId: products[2]._id, quantity: 2, price: products[2].price },
        ],
        totalAmount: products[0].price + products[2].price * 2,
        address: { fullName: customer.name, street: "42 Demo Street", city: "Mumbai", postalCode: "400001", country: "India" },
        paymentId: "demo-payment-001",
        status: "delivered",
      },
      { new: true, upsert: true, runValidators: true }
    );

    console.log("Demo data seeded successfully.");
    console.log("Admin: admin@shopkaro.demo / Password@123");
    console.log("User: customer@shopkaro.demo / Password@123");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedDatabase();
