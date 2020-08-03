import SongDTO from "../dtos/Player/SongDTO";
import Player, { IPlayer } from "../models/music/Player";
import Song from "../models/music/Song";

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
      console.log(songObj);
      console.log(song);
      player.songs.push(songObj);
    });
    await player.save();
    return player;
  },
};
