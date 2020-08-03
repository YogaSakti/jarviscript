import SongDTO from "./SongDTO";
import { IPlayer as IPlayerDAO } from "../../models/music/Player";

interface IPlayer {
  is_playing: boolean;
  is_stopped: boolean;
  playlist_loadded?: string;
  songs: Array<SongDTO>;
  current_index: number;
  autoplay: boolean;
}

export default class PlayerDTO implements IPlayer {
  is_playing: boolean;
  is_stopped: boolean;
  playlist_loadded?: string | undefined;
  songs: SongDTO[];
  current_index: number;
  autoplay: boolean;

  constructor(iPlayer: IPlayer | IPlayerDAO) {
    this.is_playing = iPlayer.is_playing;
    this.is_stopped = iPlayer.is_stopped;
    this.songs = iPlayer.songs;
    this.current_index = iPlayer.current_index;
    this.autoplay = iPlayer.autoplay;

    const playlist_loadded = iPlayer.playlist_loadded;

    if (typeof playlist_loadded != "string" && playlist_loadded) {
      this.playlist_loadded = playlist_loadded.name;
    }
  }
}
