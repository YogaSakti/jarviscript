import { exec } from "child_process";
import YotubueDlError from "./YoutubeDlError";

export class YoutubeResult {
  public playlistName?: string;
  public results: Array<YoutubeSingleResult>;

  constructor(
    results: YoutubeSingleResult | Array<YoutubeSingleResult>,
    playlistName?: string
  ) {
    if (results instanceof YoutubeSingleResult) this.results = [results];
    else this.results = results;

    this.playlistName = playlistName;
  }
}

interface IYoutubeSingleResult {
  id: string;
  title: string;
  video_stream_url: string;
  audio_stream_url: string;
  thumbnail?: string;
}

class YoutubeSingleResult {
  public id: string;
  public title: string;
  public video_stream_url: string;
  public audio_stream_url: string;
  public thumbnail?: string;

  constructor(iYoutubeSingleResult: IYoutubeSingleResult) {
    this.id = iYoutubeSingleResult.id;
    this.title = iYoutubeSingleResult.title;
    this.video_stream_url = iYoutubeSingleResult.video_stream_url;
    this.audio_stream_url = iYoutubeSingleResult.audio_stream_url;
    this.thumbnail = iYoutubeSingleResult.thumbnail;
  }
}

function getBests(resultParsed: any): YoutubeSingleResult {
  let video_stream_url: string = "";
  let audio_stream_url: string = "";

  resultParsed.requested_formats.forEach((requested: any) => {
    switch (requested.format_id) {
      case 249:
      case 250:
      case 171:
      case 140:
      case 251:
        video_stream_url = requested.url;
        break;
      default:
        audio_stream_url = requested.url;
        break;
    }
  });

  const youtubeSingleResult = new YoutubeSingleResult({
    id: resultParsed.id,
    title: resultParsed.title,
    video_stream_url,
    audio_stream_url,
  });

  const thumbnails: Array<any> = resultParsed.thumbnails;

  thumbnails.sort((a, b) => {
    let resA = a.width * a.height;
    let resB = b.width * b.height;
    return resB - resA;
  });

  youtubeSingleResult.thumbnail = thumbnails[0].url;

  return youtubeSingleResult;
}

export default {
  async getInfoFromUrl(url: string): Promise<YoutubeResult> {
    try {
      const result: string = await new Promise((resolve, reject) => {
        exec(
          `youtube-dl ${url} --audio-format best --ignore-errors --flat-playlist -J -s --add-metadata`,
          (error, stdout, stderr) => {
            if (error) return reject(error);
            if (stderr) return reject(stderr);
            return resolve(stdout);
          }
        );
      });

      const parsed: any = JSON.parse(result);
      const type: string = parsed._type;
      if (type === "playlist") {
        const ytPlaylistResult: Array<YoutubeSingleResult> = [];

        parsed.entries.forEach((entry: any) =>
          ytPlaylistResult.push(new YoutubeSingleResult(entry))
        );

        return new YoutubeResult(ytPlaylistResult, parsed.title);
      } else {
        return new YoutubeResult(getBests(parsed));
      }
    } catch (error) {
      throw new YotubueDlError(error);
    }
  },
};
