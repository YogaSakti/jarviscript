import config from "./config";
import PlayerAppendDTO from "../../dtos/Player/PlayerAppendDTO";
import playerDAO, { PlayerDAOError } from "../../persistence/PlayerDAO";

import queryFetch from "./QueryFetch";
import SongDTO from "../../dtos/Player/SongDTO";
import PlayerDTO from "../../dtos/Player/PlayerDTO";
import { IPlayer } from "../../models/music/Player";

import appController from "../../app";
import MPV from "./MPV";

export class PlayerServiceError extends Error {
  public message: string;
  public error: string;
  constructor({ message, error }: PlayerDAOError) {
    super();
    this.message = message;
    this.error = error;
  }
}

export default {
  async append({ query }: PlayerAppendDTO): Promise<PlayerDTO> {
    const songs: Array<SongDTO> = await queryFetch(query);
    const player: IPlayer = await playerDAO.appendToPlayerPlaylist(songs);
    return new PlayerDTO(player);
  },

  async play(): Promise<SongDTO> {
    const globalMPV: MPV = appController["MPV"];

    const player: IPlayer = await playerDAO.getOrCreatePlayer();
    const index = player.current_index;
    const song = player.songs[index];
    const youtube_url = song.youtube_url;
    const stream_url = song.stream_url;

    await globalMPV.replaceSong(stream_url || youtube_url || "");

    return song;
  },

  async next(): Promise<SongDTO> {
    const globalMPV: MPV = appController["MPV"];

    try {
      const player: IPlayer = await playerDAO.next();
      const index = player.current_index;
      const song = player.songs[index];
      const stream_url = song.stream_url;
      const youtube_url = song.youtube_url;

      await globalMPV.replaceSong(stream_url || youtube_url || "");
      return song;
    } catch (error) {
      throw new PlayerServiceError(error);
    }
  },
};
