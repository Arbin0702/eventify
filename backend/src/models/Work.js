const mongoose = require("mongoose");

const WorkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Activations", "Corporate", "Community", "Exhibitions", "Logistics"],
      required: true
    },
    location: { type: String, required: true, trim: true },
    outcome: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true } // e.g. /uploads/work/123.png
  },
  { timestamps: true }
);

module.exports = mongoose.model("Work", WorkSchema);