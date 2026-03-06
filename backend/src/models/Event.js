const mongoose = require("mongoose");

const foodPricingSchema = new mongoose.Schema(
  {
    standard: { type: Number, default: 0 },
    premium: { type: Number, default: 0 },
    vip: { type: Number, default: 0 }
  },
  { _id: false }
);

const photographySchema = new mongoose.Schema(
  {
    available: { type: Boolean, default: false },
    price: { type: Number, default: 0 }
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    imageUrl: { type: String, default: "" },

    availableDates: [{ type: String }],
    minAttendees: { type: Number, default: 1 },
    maxAttendees: { type: Number, default: 300 },

    venuePrice: { type: Number, default: 0 },
    foodPricing: { type: foodPricingSchema, default: () => ({}) },

    parkingAvailable: { type: Boolean, default: false },

    photographyService: {
      type: photographySchema,
      default: () => ({ available: false, price: 0 })
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);