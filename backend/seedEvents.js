const mongoose = require("mongoose");
require("dotenv").config();

const Event = require("./src/models/Event");
// IMPORTANT
// Replace this with a real user ID from your database
const USER_ID = "000000000000000000000001";

const events = [
{
title: "Music Festival",
location: "Sydney",
description: "Outdoor music event",
imageUrl: "",
availableDates: ["2026-06-10"],
venuePrice: 1000,
createdBy: USER_ID
},
{
title: "Tech Conference",
location: "Sydney CBD",
description: "Technology networking event",
imageUrl: "",
availableDates: ["2026-05-20"],
venuePrice: 1500,
createdBy: USER_ID
},
{
title: "Wedding Expo",
location: "Parramatta",
description: "Wedding planning exhibition",
imageUrl: "",
availableDates: ["2026-07-15"],
venuePrice: 2000,
createdBy: USER_ID
},
{
title: "Startup Pitch",
location: "Haymarket",
description: "Startup investors event",
imageUrl: "",
availableDates: ["2026-08-10"],
venuePrice: 500,
createdBy: USER_ID
},
{
title: "Art Exhibition",
location: "Opera House",
description: "Modern art display",
imageUrl: "",
availableDates: ["2026-04-10"],
venuePrice: 800,
createdBy: USER_ID
},
{
title: "Food Festival",
location: "Darling Harbour",
description: "Street food celebration",
imageUrl: "",
availableDates: ["2026-09-05"],
venuePrice: 1200,
createdBy: USER_ID
},
{
title: "Fashion Show",
location: "Sydney CBD",
description: "Designer fashion show",
imageUrl: "",
availableDates: ["2026-10-10"],
venuePrice: 2500,
createdBy: USER_ID
},
{
title: "Business Meetup",
location: "Chatswood",
description: "Business networking",
imageUrl: "",
availableDates: ["2026-03-25"],
venuePrice: 400,
createdBy: USER_ID
},
{
title: "Cultural Festival",
location: "Granville",
description: "Community cultural celebration",
imageUrl: "",
availableDates: ["2026-11-02"],
venuePrice: 700,
createdBy: USER_ID
},
{
title: "Gaming Convention",
location: "Sydney Olympic Park",
description: "Video game expo",
imageUrl: "",
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