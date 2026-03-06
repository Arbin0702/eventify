require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt.js");

const User = require("../src/models/User");
const Event = require("../src/models/Event");

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected for seeding");

  await User.deleteMany({});
  await Event.deleteMany({});

  const adminPassword = await bcrypt.hash("admin123", 10);

  const admin = await User.create({
    name: "Admin",
    email: "admin@test.com",
    password: adminPassword,
    role: "admin"
  });

  const events = [
    {
      title: "Luxury Wedding Reception",
      location: "Sydney Harbour",
      description: "Elegant waterfront wedding reception with premium dining and photography options.",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
      availableDates: ["2026-04-12", "2026-04-19", "2026-05-03"],
      minAttendees: 50,
      maxAttendees: 250,
      venuePrice: 4500,
      foodPricing: { standard: 55, premium: 85, vip: 120 },
      parkingAvailable: true,
      photographyService: { available: true, price: 900 },
      createdBy: admin._id
    },
    {
      title: "Corporate Gala Dinner",
      location: "Barangaroo",
      description: "A polished corporate dinner event perfect for awards, launches, and executive networking.",
      imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
      availableDates: ["2026-04-20", "2026-04-27", "2026-05-11"],
      minAttendees: 40,
      maxAttendees: 300,
      venuePrice: 6000,
      foodPricing: { standard: 60, premium: 95, vip: 130 },
      parkingAvailable: true,
      photographyService: { available: true, price: 1200 },
      createdBy: admin._id
    },
    {
      title: "Birthday Party Celebration",
      location: "Parramatta",
      description: "Fun, colourful birthday event package with flexible food and optional photo coverage.",
      imageUrl: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=1400&q=80",
      availableDates: ["2026-04-10", "2026-04-17", "2026-04-24"],
      minAttendees: 20,
      maxAttendees: 120,
      venuePrice: 1800,
      foodPricing: { standard: 25, premium: 40, vip: 60 },
      parkingAvailable: true,
      photographyService: { available: true, price: 450 },
      createdBy: admin._id
    },
    {
      title: "Community Festival Day",
      location: "Liverpool",
      description: "Large outdoor festival setup with food stalls, family activities and event coverage.",
      imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80",
      availableDates: ["2026-05-02", "2026-05-16", "2026-06-06"],
      minAttendees: 80,
      maxAttendees: 500,
      venuePrice: 7000,
      foodPricing: { standard: 20, premium: 35, vip: 50 },
      parkingAvailable: true,
      photographyService: { available: true, price: 1500 },
      createdBy: admin._id
    },
    {
      title: "Engagement Party Night",
      location: "Surry Hills",
      description: "Stylish engagement party with intimate venue, modern food packages and optional photographer.",
      imageUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=80",
      availableDates: ["2026-04-14", "2026-04-28", "2026-05-12"],
      minAttendees: 30,
      maxAttendees: 180,
      venuePrice: 2800,
      foodPricing: { standard: 40, premium: 65, vip: 95 },
      parkingAvailable: false,
      photographyService: { available: true, price: 700 },
      createdBy: admin._id
    },
    {
      title: "Product Launch Showcase",
      location: "Sydney CBD",
      description: "Premium launch event for brands wanting a strong first impression with media-friendly visuals.",
      imageUrl: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1400&q=80",
      availableDates: ["2026-05-08", "2026-05-22", "2026-06-12"],
      minAttendees: 50,
      maxAttendees: 220,
      venuePrice: 5200,
      foodPricing: { standard: 45, premium: 75, vip: 110 },
      parkingAvailable: true,
      photographyService: { available: true, price: 1300 },
      createdBy: admin._id
    },
    {
      title: "Outdoor Music Evening",
      location: "Bondi",
      description: "Relaxed outdoor music event with food service, parking access and optional event photography.",
      imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1400&q=80",
      availableDates: ["2026-04-18", "2026-05-09", "2026-05-23"],
      minAttendees: 60,
      maxAttendees: 400,
      venuePrice: 4800,
      foodPricing: { standard: 30, premium: 50, vip: 75 },
      parkingAvailable: true,
      photographyService: { available: true, price: 800 },
      createdBy: admin._id
    },
    {
      title: "Baby Shower Brunch",
      location: "Chatswood",
      description: "Warm and elegant brunch event setup for baby showers with flexible menu options.",
      imageUrl: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1400&q=80",
      availableDates: ["2026-04-11", "2026-04-25", "2026-05-09"],
      minAttendees: 15,
      maxAttendees: 80,
      venuePrice: 1500,
      foodPricing: { standard: 22, premium: 35, vip: 55 },
      parkingAvailable: true,
      photographyService: { available: true, price: 350 },
      createdBy: admin._id
    },
    {
      title: "Exhibition & Trade Booth Event",
      location: "ICC Sydney",
      description: "Exhibition booth support event with premium venue, attendee flow management and event photography.",
      imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
      availableDates: ["2026-06-01", "2026-06-08", "2026-06-15"],
      minAttendees: 70,
      maxAttendees: 350,
      venuePrice: 6500,
      foodPricing: { standard: 35, premium: 60, vip: 90 },
      parkingAvailable: true,
      photographyService: { available: true, price: 1100 },
      createdBy: admin._id
    },
    {
      title: "Private Anniversary Dinner",
      location: "Manly",
      description: "Romantic private anniversary dinner event with premium catering and memorable photography service.",
      imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80",
      availableDates: ["2026-04-13", "2026-04-26", "2026-05-10"],
      minAttendees: 10,
      maxAttendees: 60,
      venuePrice: 2200,
      foodPricing: { standard: 38, premium: 58, vip: 88 },
      parkingAvailable: false,
      photographyService: { available: true, price: 500 },
      createdBy: admin._id
    }
  ];

  await Event.insertMany(events);

  console.log("✅ Seed complete");
  console.log("Admin login: admin@test.com / admin123");

  await mongoose.disconnect();
}

run().catch((e) => {
  console.error("❌ Seed error:", e);
  process.exit(1);
});