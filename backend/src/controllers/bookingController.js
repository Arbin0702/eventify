const Booking = require("../models/Booking");
const Event = require("../models/Event");
const { createBookingSchema } = require("../validations/bookingValidation");
const nodemailer = require("nodemailer");

const transporter =
  process.env.EMAIL_USER && process.env.EMAIL_PASS
    ? nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      })
    : null;

async function sendApprovalEmail(booking) {
  if (!transporter) {
    console.log("Email skipped: EMAIL_USER or EMAIL_PASS missing");
    return;
  }

  const userName = booking.userId?.name || "Customer";
  const userEmail = booking.userId?.email;
  const eventTitle = booking.eventId?.title || "Event";
  const eventLocation = booking.eventId?.location || "N/A";

  if (!userEmail) {
    console.log("Email skipped: user email missing");
    return;
  }

  const receiptUrl = `https://eventify-cky7.vercel.app/bookings/${booking._id}`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
      <h2 style="margin-bottom: 8px;">Booking Approved ✅</h2>
      <p>Hi ${userName},</p>
      <p>Your booking has been <strong>approved</strong>.</p>

      <div style="margin: 16px 0; padding: 14px; background: #f6f8fb; border-radius: 10px;">
        <p><strong>Event:</strong> ${eventTitle}</p>
        <p><strong>Location:</strong> ${eventLocation}</p>
        <p><strong>Date:</strong> ${booking.selectedDate}</p>
        <p><strong>Attendees:</strong> ${booking.attendees}</p>
        <p><strong>Food Package:</strong> ${booking.foodPackage}</p>
        <p><strong>Photography:</strong> ${booking.photographySelected ? "Yes" : "No"}</p>
        <p><strong>Total:</strong> $${booking.totalPrice}</p>
      </div>

      <p>You can view your receipt here:</p>
      <p>
        <a href="${receiptUrl}" style="display:inline-block;padding:10px 16px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:8px;">
          View Receipt
        </a>
      </p>

      <p>Thank you for booking with Eventify.</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Eventify" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Your Eventify booking has been approved",
    html
  });
}

exports.createBooking = async (req, res, next) => {
  try {
    const { error, value } = createBookingSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { eventId, selectedDate, attendees, foodPackage, photographySelected } = value;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (!selectedDate) {
      return res.status(400).json({ message: "Selected date is required" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pickedDate = new Date(selectedDate);
    pickedDate.setHours(0, 0, 0, 0);

    if (Number.isNaN(pickedDate.getTime())) {
      return res.status(400).json({ message: "Invalid selected date" });
    }

    if (pickedDate < today) {
      return res.status(400).json({ message: "Selected date cannot be in the past" });
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

    const totalPrice =
      Number(event.venuePrice || 0) +
      Number(foodPricePerPerson || 0) * Number(attendees || 0) +
      Number(photographyPrice || 0);

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

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

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
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const previousStatus = booking.status;
    booking.status = status;
    await booking.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate("eventId")
      .populate("userId", "name email role");

    if (status === "approved" && previousStatus !== "approved") {
      try {
        await sendApprovalEmail(populatedBooking);
      } catch (emailError) {
        console.error("Approval email failed:", emailError.message);
      }
    }

    res.json({ message: "Booking status updated", booking: populatedBooking });
  } catch (e) {
    next(e);
  }
};

exports.cancelBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findOne({
      _id: bookingId,
      userId: req.user.id
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

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