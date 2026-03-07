const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function ensureAdmin() {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.log("Admin seed skipped: ADMIN_EMAIL or ADMIN_PASSWORD missing");
      return;
    }

    let adminUser = await User.findOne({ email });

    if (adminUser) {
      if (adminUser.role !== "admin") {
        adminUser.role = "admin";
        await adminUser.save();
        console.log("Existing user promoted to admin");
      } else {
        console.log("Admin user already exists");
      }
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: "Admin",
      email,
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error ensuring admin user:", error.message);
  }
}

module.exports = ensureAdmin;