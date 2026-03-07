require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");
const ensureAdmin = require("./utils/ensureAdmin");
const seedEvents = require("./utils/seedEvents");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    await ensureAdmin();
    await seedEvents();

    app.listen(PORT, () => {
      console.log("Server running on port " + PORT);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });