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
    const player = await Player.findOne({});

    if (!player) {
      const player = new Player({
        is_playing: false,
        is_stopped: true,
        songs: [],
        current_index: 0,
        autoplay: false,
      });
      await player.save();
      return player;
    } else return player;
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

  async nextPrev(isNext: boolean): Promise<IPlayer> {
    const player = await this.getOrCreatePlayer();
    const qtd_songs = player.songs.length;

    const newIndex = player.current_index + (isNext ? 1 : -1);

    if (newIndex < qtd_songs - 1 && newIndex >= 0) {
      player.current_index = newIndex;
      await player.save();
      return player;
    } else {
      throw new PlayerDAOError("Out of bounds.", "out_of_bounds");
    }
  },

  async updateStreamUrl(songDTO: SongDTO, newStreamUrl: string) {
    const player = await this.getOrCreatePlayer();
    player.songs.forEach((song) => {
      if (String(song._id) == songDTO._id) {
        song.stream_url = newStreamUrl;
        // song.save();
      }
    });
    return player.save();
  },
};
