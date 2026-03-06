const Event = require("../models/Event");

exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (e) {
    next(e);
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (e) {
    next(e);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const {
      title,
      location,
      description,
      availableDates,
      minAttendees,
      maxAttendees,
      venuePrice,
      foodStandard,
      foodPremium,
      foodVip,
      parkingAvailable,
      photoAvailable,
      photoPrice
    } = req.body;

    if (!title || !location || !description) {
      return res.status(400).json({ message: "Title, location and description are required" });
    }

    const parsedDates =
      typeof availableDates === "string"
        ? availableDates.split(",").map((d) => d.trim()).filter(Boolean)
        : Array.isArray(availableDates)
          ? availableDates.filter(Boolean)
          : [];

    const imageUrl = req.file ? `/uploads/events/${req.file.filename}` : "";

    const event = await Event.create({
      title,
      location,
      description,
      imageUrl,
      availableDates: parsedDates,
      minAttendees: Number(minAttendees) || 1,
      maxAttendees: Number(maxAttendees) || 300,
      venuePrice: Number(venuePrice) || 0,
      foodPricing: {
        standard: Number(foodStandard) || 0,
        premium: Number(foodPremium) || 0,
        vip: Number(foodVip) || 0
      },
      parkingAvailable: parkingAvailable === "true" || parkingAvailable === true,
      photographyService: {
        available: photoAvailable === "true" || photoAvailable === true,
        price: Number(photoPrice) || 0
      },
      createdBy: req.user.id
    });

    res.status(201).json(event);
  } catch (e) {
    next(e);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const {
      title,
      location,
      description,
      availableDates,
      minAttendees,
      maxAttendees,
      venuePrice,
      foodStandard,
      foodPremium,
      foodVip,
      parkingAvailable,
      photoAvailable,
      photoPrice,
      keepExistingImage
    } = req.body;

    const existing = await Event.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Event not found" });

    const parsedDates =
      typeof availableDates === "string"
        ? availableDates.split(",").map((d) => d.trim()).filter(Boolean)
        : Array.isArray(availableDates)
          ? availableDates.filter(Boolean)
          : [];

    let imageUrl = existing.imageUrl || "";

    if (req.file) {
      imageUrl = `/uploads/events/${req.file.filename}`;
    } else if (keepExistingImage === "false") {
      imageUrl = "";
    }

    existing.title = title;
    existing.location = location;
    existing.description = description;
    existing.imageUrl = imageUrl;
    existing.availableDates = parsedDates;
    existing.minAttendees = Number(minAttendees) || 1;
    existing.maxAttendees = Number(maxAttendees) || 300;
    existing.venuePrice = Number(venuePrice) || 0;
    existing.foodPricing = {
      standard: Number(foodStandard) || 0,
      premium: Number(foodPremium) || 0,
      vip: Number(foodVip) || 0
    };
    existing.parkingAvailable = parkingAvailable === "true" || parkingAvailable === true;
    existing.photographyService = {
      available: photoAvailable === "true" || photoAvailable === true,
      price: Number(photoPrice) || 0
    };

    await existing.save();

    res.json(existing);
  } catch (e) {
    next(e);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (e) {
    next(e);
  }
};