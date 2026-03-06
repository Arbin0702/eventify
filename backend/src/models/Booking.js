const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },

    selectedDate: { type: String, required: true },
    attendees: { type: Number, required: true, min: 1 },

    foodPackage: {
      type: String,
      enum: ["standard", "premium", "vip"],
      default: "standard"
    },

    photographySelected: { type: Boolean, default: false },

    totalPrice: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["pending", "approved", "completed", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);