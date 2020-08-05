import SongDTO from "../dtos/Player/SongDTO";
import Player, { IPlayer } from "../models/music/Player";
import Song from "../models/music/Song";

export class PlayerDAOError extends Error {
  public message: string;
  public error: string;
  constructor(message: string, error: string) {
    super();
    this.message = message;
    this.error = error;
  }
}

export default {
  async getOrCreatePlayer(): Promise<IPlayer> {
    const player = await Player.find({});

    if (player.length == 0) {
      const player = new Player({
        is_playing: false,
        is_stopped: true,
        songs: [],
        current_index: 0,
        autoplay: false,
      });
      await player.save();
      return player;
    } else return player[0];
  },

  async appendToPlayerPlaylist(songs: Array<SongDTO>): Promise<IPlayer> {
    const player = await this.getOrCreatePlayer();
    songs.forEach(async (song: SongDTO) => {
      const songObj = new Song({
        title: song.title,
        cover: song.cover,
        youtube_url: song.youtube_url,
        stream_url: song.stream_url,
      });
      player.songs.push(songObj);
    });
    await player.save();
    return player;
  },

  async next(): Promise<IPlayer> {
    const player = await this.getOrCreatePlayer();
    const qtd_songs = player.songs.length;

    if (player.current_index < qtd_songs - 1) {
      player.save();
      player.current_index++;
      return player;
    } else {
      throw new PlayerDAOError("Out of bounds.", "out_of_bounds");
    }
  },
};
