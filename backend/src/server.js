require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("✅ DB NAME:", mongoose.connection.name);
    console.log("✅ HOST:", mongoose.connection.host);
    console.log("✅ PORT:", mongoose.connection.port);

    app.listen(PORT, () =>
      console.log(`✅ Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ Mongo error:", err));