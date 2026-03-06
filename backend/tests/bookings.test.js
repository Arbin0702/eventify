const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");
const Event = require("../src/models/Event");
const bcrypt = require("bcrypt.js");
const jwt = require("jsonwebtoken");

function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET || "testsecret", { expiresIn: "1h" });
}

describe("Bookings", () => {
  test("User can create booking, view /me, and cancel", async () => {
    const user = await User.create({
      name: "Book User",
      email: "book@test.com",
      password: await bcrypt.hash("123456", 10),
      role: "user"
    });

    const event = await Event.create({
      title: "Booking Event",
      location: "Sydney",
      date: "2026-03-10",
      description: "Book it",
      createdBy: user._id
    });

    const token = signToken({ id: user._id.toString(), email: user.email, role: "user" });

    const create = await request(app)
      .post("/api/bookings")
      .set("Authorization", `Bearer ${token}`)
      .send({ eventId: event._id.toString() });

    expect(create.statusCode).toBe(201);
    const bookingId = create.body._id;
    expect(bookingId).toBeDefined();

    const me1 = await request(app)
      .get("/api/bookings/me")
      .set("Authorization", `Bearer ${token}`);

    expect(me1.statusCode).toBe(200);
    expect(me1.body.length).toBe(1);
    expect(me1.body[0].status).toBe("confirmed");

    const cancel = await request(app)
      .patch(`/api/bookings/${bookingId}/cancel`)
      .set("Authorization", `Bearer ${token}`);

    expect(cancel.statusCode).toBe(200);
    expect(cancel.body.message).toBe("Booking cancelled");

    const me2 = await request(app)
      .get("/api/bookings/me")
      .set("Authorization", `Bearer ${token}`);

    expect(me2.statusCode).toBe(200);
    expect(me2.body[0].status).toBe("cancelled");
  });
});