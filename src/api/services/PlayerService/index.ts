import config from "./config";
import PlayerAppendDTO from "../../dtos/Player/PlayerAppendDTO";
import playerDAO from "../../persistence/PlayerDAO";

import queryFetch from "./QueryFetch";
import SongDTO from "../../dtos/Player/SongDTO";
import PlayerDTO from "../../dtos/Player/PlayerDTO";
import { IPlayer } from "../../models/music/Player";

const mpvAPI = require("node-mpv");
const mpv = new mpvAPI(config);

export default {
  async append({ query }: PlayerAppendDTO): Promise<PlayerDTO> {
    const songs: Array<SongDTO> = await queryFetch(query);
    const player: IPlayer = await playerDAO.appendToPlayerPlaylist(songs);
    return new PlayerDTO(player);
  },

  async play(): Promise<SongDTO> {
    const player: IPlayer = await playerDAO.getOrCreatePlayer();
    const index = player.current_index;
    const song = player.songs[index];
    const youtube_url = song.stream_url;
    await mpv.start();
    await mpv.load(youtube_url);
    return song;
  },
};
