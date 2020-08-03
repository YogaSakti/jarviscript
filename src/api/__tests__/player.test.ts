import app from "../app";
import request from "supertest";
import PlayerAppendDTO from "../dtos/Player/PlayerAppendDTO";

describe("player", () => {
  it("should append a new song to player playlist", async (done) => {
    const playerAppendDTO = new PlayerAppendDTO({
      query: "https://www.youtube.com/watch?v=GVDJ8O3lPBA",
    });

    await request(app)
      .post("/api/player/append")
      .send(playerAppendDTO)
      .expect(200);
    done();
  });
});
