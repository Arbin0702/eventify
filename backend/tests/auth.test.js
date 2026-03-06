const request = require("supertest");
const app = require("../src/app");

describe("Auth", () => {
  test("register then login returns token", async () => {
    const reg = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@test.com",
      password: "123456"
    });
    expect(reg.statusCode).toBe(201);

    const login = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "123456"
    });

    expect(login.statusCode).toBe(200);
    expect(login.body.token).toBeDefined();
    expect(login.body.user).toBeDefined();
  });
});