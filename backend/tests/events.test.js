const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET || "testsecret", { expiresIn: "1h" });
}

describe("Events", () => {
  test("GET /api/events returns array", async () => {
    const res = await request(app).get("/api/events");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Admin can create, update and delete event", async () => {
    const admin = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: await bcrypt.hash("admin123", 10),
      role: "admin"
    });

    const token = signToken({ id: admin._id.toString(), email: admin.email, role: "admin" });

    const createRes = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Event",
        location: "Sydney",
        date: "2026-03-10",
        description: "Event for testing"
      });

    expect(createRes.statusCode).toBe(201);
    const eventId = createRes.body._id;
    expect(eventId).toBeDefined();

    const updateRes = await request(app)
      .patch(`/api/events/${eventId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Title" });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.title).toBe("Updated Title");

    const delRes = await request(app)
      .delete(`/api/events/${eventId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(delRes.statusCode).toBe(200);
    expect(delRes.body.message).toBe("Event deleted");
  });

  test("Non-admin cannot create event", async () => {
    const user = await User.create({
      name: "User",
      email: "user@test.com",
      password: await bcrypt.hash("123456", 10),
      role: "user"
    });

    const token = signToken({ id: user._id.toString(), email: user.email, role: "user" });

    const res = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Should Fail",
        location: "Sydney",
        date: "2026-03-10",
        description: "No admin"
      });

    expect(res.statusCode).toBe(403);
  });
});