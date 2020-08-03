import { Request, Response } from "express";
import playerService from "../services/PlayerService";
import PlayerAppendDTO from "../dtos/Player/PlayerAppendDTO";
import PlayerDTO from "../dtos/Player/PlayerDTO";
import SongDTO from "../dtos/Player/SongDTO";

export default {
  async append(req: Request, res: Response) {
    try {
      const playerAppendDTO = new PlayerAppendDTO(req.body);
      const playerDTO: PlayerDTO = await playerService.append(playerAppendDTO);
      return res.json(playerDTO);
    } catch (error) {
      console.log(error);
    }

    return res.send("ok");
  },

  async play(req: Request, res: Response) {
    const song: SongDTO = await playerService.play();
    res.json(song);
  },
};
