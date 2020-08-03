import ServiceFetcher, { IServiceFetcher } from "../ServiceFetcher";
import SongDTO from "../../../../dtos/Player/SongDTO";
import ytdl from "../../utils/YoutubeDL";

class YoutubeFecther extends ServiceFetcher {
  public query: string;
  public songs: SongDTO[];

  constructor(query: string) {
    super();
    this.query = query;
    this.songs = [];
  }

  check(): Boolean {
    const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    return youtubeRegex.test(this.query);
  }

  async fetch(): Promise<SongDTO[]> {
    const url = new URL(this.query);
    const result = await ytdl.getInfoFromUrl(this.query);

    const songs: Array<SongDTO> = [];

    result.forEach((ytResult) => {
      songs.push({
        title: ytResult.title,
        cover: ytResult.thumbnail,
        youtube_url: `https://youtu.be/${ytResult.id}`,
        stream_url: ytResult.audio_stream_url,
      });
    });

    return songs;
  }
}

export default YoutubeFecther;
