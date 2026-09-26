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
      { name: "Wireless Headphones", description: "Bluetooth over-ear headphones with clear sound.", price: 2499, category: "Electronics", stock: 18, imageUrl: "data:image/webp;base64,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", ratings: 4.4, numOfReviews: 27 },
      { name: "Cotton Casual T-Shirt", description: "Comfortable regular-fit cotton t-shirt.", price: 699, category: "Fashion", stock: 45, imageUrl: "https://placehold.co/600x400?text=Casual+T-Shirt", ratings: 4.1, numOfReviews: 16 },
      { name: "Steel Water Bottle", description: "Insulated stainless-steel water bottle, 750 ml.", price: 899, category: "Home & Kitchen", stock: 30, imageUrl: "https://placehold.co/600x400?text=Water+Bottle", ratings: 4.6, numOfReviews: 39 },
       {
        name: 'Minimalist Modern Chair',
        description: 'A stylish and comfortable addition to any contemporary living room.',
        price: 150.00,
        category: 'Furniture',
        stock: 30,
        imageUrl: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.2,
        numReviews: 12
      },
      {
        name: 'Professional DSLR Camera',
        description: 'Capture stunning moments with high-resolution clarity and speed.',
        price: 1199.99,
        category: 'Electronics',
        stock: 8,
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.9,
        numReviews: 50
      },
       {
        name: 'Classic White Sneakers',
        description: 'Versatile and comfortable, a staple for any casual outfit.',
        price: 85.00,
        category: 'Clothing',
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.5,
        numReviews: 89
      },
      {
        name: 'Wooden Study Table',
        description: 'Durable wooden study table with a spacious work surface and storage drawer for home or office use.',
        price: 6499.00,
        category: 'Furniture',
        stock: 12,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.5,
        numReviews: 89
      },
      {
        name: 'Smart Fitness Watch',
        description: 'Track daily steps, heart rate, sleep patterns, and workout activity with a bright touch display.',
        price: 2999,
        category: 'Electronics',
        stock: 25,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.5,
        numReviews: 89
      },
      {
        name: 'Ceramic Coffee Mug Set',
        description: 'Set of four elegant ceramic coffee mugs, suitable for tea, coffee, and everyday use.',
        price: 1199,
        category: 'Home & Kitchen',
        stock: 30,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.5,
        numReviews: 89
      },
      {
        name: 'Yoga Exercise Mat',
        description: 'Non-slip, lightweight yoga mat with       comfortable cushioning for yoga, stretching, and       workouts.',
        price:  Rs899,
        category: 'Sports',
        stock: 40,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.5,
        numReviews: 89
      }
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
