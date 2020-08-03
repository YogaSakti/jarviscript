import { exec } from "child_process";
import YotubueDlError from "./YoutubeDlError";

interface IYoutubeResult {
  id: string;
  title: string;
  video_stream_url?: string;
  audio_stream_url?: string;
  thumbnail?: string;
}

class YoutubeResult {
  public id: string;
  public title: string;
  public video_stream_url?: string;
  public audio_stream_url?: string;
  public thumbnail?: string;

  constructor(iYoutubeResult: IYoutubeResult) {
    this.id = iYoutubeResult.id;
    this.title = iYoutubeResult.title;
    this.video_stream_url = iYoutubeResult.video_stream_url;
    this.audio_stream_url = iYoutubeResult.audio_stream_url;
    this.thumbnail = iYoutubeResult.thumbnail;
  }
}

function getBests(resultParsed: any): YoutubeResult {
  const youtubeResult = new YoutubeResult({
    id: resultParsed.id,
    title: resultParsed.title,
  });

  resultParsed.requested_formats.forEach((requested: any) => {
    if (requested.format_note == "DASH video")
      youtubeResult.video_stream_url = requested.fragment_base_url;
    else if (requested.format_note == "DASH audio")
      youtubeResult.audio_stream_url = requested.fragment_base_url;
  });

  const thumbnails: Array<any> = resultParsed.thumbnails;

  thumbnails.sort((a, b) => {
    let resA = a.width * a.height;
    let resB = b.width * b.height;
    return resB - resA;
  });

  youtubeResult.thumbnail = thumbnails[0].url;

  return youtubeResult;
}

export default {
  async getInfoFromUrl(url: string): Promise<Array<YoutubeResult>> {
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
        const ytPlaylistResult: Array<YoutubeResult> = [];

        parsed.entries.forEach((entry: any) =>
          ytPlaylistResult.push(new YoutubeResult(entry))
        );

        return ytPlaylistResult;
      } else {
        return [getBests(parsed)];
      }
    } catch (error) {
      throw new YotubueDlError(error);
    }
  },
};
