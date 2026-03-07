const mongoose = require("mongoose");
require("dotenv").config();
console.log("MONGO_URI =", process.env.MONGO_URI);
const Event = require("../models/Event");

const USER_ID = "000000000000000000000001";

const events = [
{
title: "Music Festival",
location: "Sydney",
description: "Outdoor music event",
imageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
availableDates: ["2026-06-10"],
venuePrice: 1000,
createdBy: USER_ID
},
{
title: "Tech Conference",
location: "Sydney CBD",
description: "Technology networking event",
imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
availableDates: ["2026-05-20"],
venuePrice: 1500,
createdBy: USER_ID
},
{
title: "Wedding Expo",
location: "Parramatta",
description: "Wedding planning exhibition",
imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552",
availableDates: ["2026-07-15"],
venuePrice: 2000,
createdBy: USER_ID
},
{
title: "Startup Pitch",
location: "Haymarket",
description: "Startup investors event",
imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
availableDates: ["2026-08-10"],
venuePrice: 500,
createdBy: USER_ID
},
{
title: "Art Exhibition",
location: "Opera House",
description: "Modern art display",
imageUrl: "https://images.unsplash.com/photo-1531058020387-3be344556be6",
availableDates: ["2026-04-10"],
venuePrice: 800,
createdBy: USER_ID
},
{
title: "Food Festival",
location: "Darling Harbour",
description: "Street food celebration",
imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
availableDates: ["2026-09-05"],
venuePrice: 1200,
createdBy: USER_ID
},
{
title: "Fashion Show",
location: "Sydney CBD",
description: "Designer fashion show",
imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
availableDates: ["2026-10-10"],
venuePrice: 2500,
createdBy: USER_ID
},
{
title: "Business Meetup",
location: "Chatswood",
description: "Business networking",
imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
availableDates: ["2026-03-25"],
venuePrice: 400,
createdBy: USER_ID
},
{
title: "Cultural Festival",
location: "Granville",
description: "Community cultural celebration",
imageUrl: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf",
availableDates: ["2026-11-02"],
venuePrice: 700,
createdBy: USER_ID
},
{
title: "Gaming Convention",
location: "Sydney Olympic Park",
description: "Video game expo",
imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
availableDates: ["2026-12-01"],
venuePrice: 1800,
createdBy: USER_ID
}
];

async function seedEvents() {
try {

await mongoose.connect(process.env.MONGO_URI);

console.log("MongoDB connected");

await Event.deleteMany();

console.log("Old events deleted");

await Event.insertMany(events);

console.log("10 events inserted");

process.exit();

} catch (err) {

console.error(err);
process.exit(1);

}
}

seedEvents();