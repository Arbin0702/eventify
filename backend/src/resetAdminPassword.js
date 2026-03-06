require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

async function main() {
  const email = "admin@test.com";
  const newPassword = "Admin12345";

  await mongoose.connect(process.env.MONGO_URI);

  const hash = await bcrypt.hash(newPassword, 10);

  const user = await User.findOneAndUpdate(
    { email },
    { password: hash },
    { new: true }
  );

  if (!user) {
    console.log("❌ User not found:", email);
  } else {
    console.log("✅ Password reset for:", user.email);
    console.log("✅ New password:", newPassword);
    console.log("✅ New hash starts:", user.password.slice(0, 4)); // $2a$ or $2b$
  }

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error("❌ Reset failed:", e);
  process.exit(1);
});