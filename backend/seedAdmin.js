require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User");

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    const existing = await User.findOne({ email });

    if (existing) {
      existing.role = "admin";
      await existing.save();
      console.log("Existing user updated to admin");
    } else {
      const hashed = await bcrypt.hash(password, 10);

      await User.create({
        name: "Admin",
        email,
        password: hashed,
        role: "admin"
      });

      console.log("Admin user created");
    }

    process.exit(0);
  } catch (err) {
    console.error("Error seeding admin:", err);
    process.exit(1);
  }
}

seedAdmin();