import request from "supertest";
import app from "../app";
import RegisterUserDTO from "../dtos/RegisterUserDTO";
import LoginUserDTO from "../dtos/LoginUserDTO";
import truncate from "./utils/truncate";

describe("user", () => {
  beforeAll(truncate);

  it("should create a new user", async (done) => {
    const userDTO = new RegisterUserDTO({
      name: "Gabriel Sancho",
      username: "sancho41",
      email: "gabriel.sancho13@gmail.com",
      whatsapp: "5561983319998",
      password: "321456",
    });

    await request(app)
      .post("/api/user")
      .send(userDTO)
      .expect("Content-Type", /json/)
      .expect(201);
    done();
  });

  it("should login a user with username and password", async (done) => {
    const loginUserDTO = new LoginUserDTO({
      username: "sancho41",
      password: "321456",
    });

    const response = await request(app)
      .post("/api/user/login")
      .send(loginUserDTO)
      .expect("Content-Type", /json/)
      .expect(200);

    const jwt = JSON.parse(response.text).token;
    expect(jwt).toBeTruthy();
    done();
  });

  it("should register a new user and return error if try to register already registered username or password", async (done) => {
    const userDTO = new RegisterUserDTO({
      name: "Gabriel Sancho",
      username: "sancho99",
      email: "another@gmail.com",
      whatsapp: "5561983319998",
      password: "321456",
    });

    await request(app)
      .post("/api/user")
      .send(userDTO)
      .expect("Content-Type", /json/)
      .expect(201);

    await request(app)
      .post("/api/user")
      .send(userDTO)
      .expect("Content-Type", /json/)
      .expect(400);

    done();
  });
});
