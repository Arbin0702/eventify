const Event = require("../models/Event");
const User = require("../models/User");

async function seedEvents() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
      console.log("Event seed skipped: ADMIN_EMAIL missing");
      return;
    }

    const adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      console.log("Event seed skipped: admin user not found");
      return;
    }

    const existingCount = await Event.countDocuments();
    if (existingCount > 0) {
      console.log("Events already exist, skipping seed");
      return;
    }

    const demoEvents = [
      {
        title: "Sydney Tech Conference",
        location: "Sydney CBD",
        description: "A premium technology conference with keynote speakers, startup showcases, and networking sessions.",
        imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
        availableDates: ["2026-04-12", "2026-04-13"],
        minAttendees: 20,
        maxAttendees: 300,
        venuePrice: 2500,
        foodPricing: { standard: 35, premium: 55, vip: 80 },
        parkingAvailable: true,
        photographyService: { available: true, price: 400 },
        createdBy: adminUser._id
      },
      {
        title: "Corporate Gala Dinner",
        location: "Parramatta",
        description: "An elegant gala dinner package designed for companies, award nights, and executive networking.",
        imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=80",
        availableDates: ["2026-05-18", "2026-05-19"],
        minAttendees: 50,
        maxAttendees: 250,
        venuePrice: 3200,
        foodPricing: { standard: 45, premium: 70, vip: 95 },
        parkingAvailable: true,
        photographyService: { available: true, price: 500 },
        createdBy: adminUser._id
      }
    ];

    await Event.insertMany(demoEvents);
    console.log("Demo events seeded successfully");
  } catch (error) {
    console.error("Error seeding demo events:", error.message);
  }
}

module.exports = seedEvents;