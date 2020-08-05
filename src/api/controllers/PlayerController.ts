import { Request, Response } from "express";
import playerService, { PlayerServiceError } from "../services/PlayerService";
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
    return res.json(song);
  },

  async next(req: Request, res: Response) {
    try {
      const song: SongDTO = await playerService.next();
      return res.json(song);
    } catch (error) {
      if (error instanceof PlayerServiceError)
        return res.status(400).json(error);
      return res.status(500).json(error);
    }
  },
};
