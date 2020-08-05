import PlayerAppendDTO from "../../dtos/Player/PlayerAppendDTO";
import playerDAO, { PlayerDAOError } from "../../persistence/PlayerDAO";
import queryFetch from "./QueryFetch";
import SongDTO from "../../dtos/Player/SongDTO";
import { IPlayer } from "../../models/music/Player";

import appController from "../../app";
import MPV from "./MPV";
import ServiceFetcherDTO from "../../dtos/Player/ServiceFetcherDTO";
import { checkAll, getStreamUrl } from "./utils/urlUtils";

interface IPlayerServiceError {
  message: string;
  error: string;
}

export class PlayerServiceError extends Error {
  public message: string;
  public error: string;
  constructor({ message, error }: PlayerDAOError | IPlayerServiceError) {
    super();
    this.message = message;
    this.error = error;
  }
}

export default {
  async current(): Promise<IPlayer> {
    return await playerDAO.getOrCreatePlayer();
  },

  async append({ query }: PlayerAppendDTO): Promise<ServiceFetcherDTO> {
    const result: ServiceFetcherDTO = await queryFetch(query);
    await playerDAO.appendToPlayerPlaylist(result.songs);
    checkAll();
    return result;
  },

  async play(): Promise<SongDTO> {
    const globalMPV: MPV = appController["MPV"];

    const player: IPlayer = await playerDAO.getOrCreatePlayer();

    const qtdSongs: number = player.songs.length;

    if (qtdSongs == 0)
      throw new PlayerServiceError({
        message: "Empty Player",
        error: "empty_player",
      });

    const index = player.current_index;
    const song = player.songs[index];

    try {
      await globalMPV.play(await getStreamUrl(song));
    } catch (error) {
      console.error(error);
    }

    return song;
  },

  async nextPrev(isNext: boolean): Promise<SongDTO> {
    const globalMPV: MPV = appController["MPV"];

    try {
      const player: IPlayer = await playerDAO.nextPrev(isNext);
      const index = player.current_index;
      const song = player.songs[index];

      await globalMPV.replaceSongAndPlay(await getStreamUrl(song));
      return song;
    } catch (error) {
      throw new PlayerServiceError(error);
    }
  },

  async next(): Promise<SongDTO> {
    return this.nextPrev(true);
  },

  async prev(): Promise<SongDTO> {
    return this.nextPrev(false);
  },

  async pause() {
    const globalMPV: MPV = appController["MPV"];
    return globalMPV.pause();
  },

  async clear() {},
};
