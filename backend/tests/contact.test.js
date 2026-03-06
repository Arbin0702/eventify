const request = require("supertest");
const app = require("../src/app");

describe("Contact", () => {
  test("POST /api/contact validates and saves", async () => {
    const res = await request(app).post("/api/contact").send({
      name: "John Smith",
      email: "john@test.com",
      phone: "0400000000",
      company: "Test Co",
      service: "Brand Activations",
      budget: "$5k-$10k",
      message: "Hi, I want a quote for a product activation event in Sydney."
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Message received");
    expect(res.body.id).toBeDefined();
  });

  test("POST /api/contact rejects short message", async () => {
    const res = await request(app).post("/api/contact").send({
      name: "A",
      email: "bademail",
      message: "Hi"
    });

    expect(res.statusCode).toBe(400);
  });
});