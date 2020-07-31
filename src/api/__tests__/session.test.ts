import request from "supertest";
import app from "../app";

describe("home", () => {
  it("should show hello world", async () => {
    const response = await request(app).get("/");

    const json = JSON.parse(response.text);
    const status = response.status;

    expect(status).toBe(200);
    expect(json.message).toBe("Hello, world!");
  });
});
