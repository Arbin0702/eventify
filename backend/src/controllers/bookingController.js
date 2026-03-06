const Booking = require("../models/Booking");
const Event = require("../models/Event");
const { createBookingSchema } = require("../validations/bookingValidation");

exports.createBooking = async (req, res, next) => {
  try {
    const { error, value } = createBookingSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { eventId, selectedDate, attendees, foodPackage, photographySelected } = value;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (!event.availableDates.includes(selectedDate)) {
      return res.status(400).json({ message: "Selected date is not available" });
    }

    if (attendees < event.minAttendees || attendees > event.maxAttendees) {
      return res.status(400).json({
        message: `Attendees must be between ${event.minAttendees} and ${event.maxAttendees}`
      });
    }

    const foodPricePerPerson = event.foodPricing?.[foodPackage] || 0;
    const photographyPrice =
      photographySelected && event.photographyService?.available
        ? event.photographyService.price
        : 0;

    const totalPrice = event.venuePrice + foodPricePerPerson * attendees + photographyPrice;

    const booking = await Booking.create({
      userId: req.user.id,
      eventId,
      selectedDate,
      attendees,
      foodPackage,
      photographySelected,
      totalPrice,
      status: "pending"
    });

    res.status(201).json(booking);
  } catch (e) {
    next(e);
  }
};

exports.myBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("eventId")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (e) {
    next(e);
  }
};

exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("eventId")
      .populate("userId", "name email role");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const isOwner = booking.userId?._id?.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not allowed to view this booking" });
    }

    res.json(booking);
  } catch (e) {
    next(e);
  }
};

exports.allBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate("eventId")
      .populate("userId", "name email role")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (e) {
    next(e);
  }
};

exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ["pending", "approved", "completed", "cancelled"];

    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();

    res.json({ message: "Booking status updated", booking });
  } catch (e) {
    next(e);
  }
};

exports.cancelBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findOne({ _id: bookingId, userId: req.user.id });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.status === "completed") {
      return res.status(400).json({ message: "Completed booking cannot be cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled" });
  } catch (e) {
    next(e);
  }
};