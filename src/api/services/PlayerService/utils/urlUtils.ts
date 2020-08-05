import ytdl, { YoutubeResult } from "../utils/youtubedl";
import { IPlayer } from "../../../models/music/Player";
import playerDAO, { PlayerDAOError } from "../../../persistence/PlayerDAO";
import SongDTO from "../../../dtos/Player/SongDTO";

export async function getFromYoutubeLink(url: string): Promise<string> {
  const result: YoutubeResult = await ytdl.getInfoFromUrl(url);
  return result.results[0].audio_stream_url;
}

export function checkValidStreamUrl(url: string | undefined): boolean {
  if (!url) return false;
  const urlParsed = new URL(url);
  let expireInt = parseInt(urlParsed.searchParams.get("expire") || "") * 1000;

  if (!expireInt) {
    expireInt =
      parseInt(urlParsed.pathname.split("expire/")[1].split("/")[0]) * 1000;
  }

  const expire = new Date(expireInt);
  const now = new Date();
  console.log("valid:", now < expire, "expireInt:", expireInt);
  return now < expire;
}

export async function checkAll() {
  const player: IPlayer = await playerDAO.getOrCreatePlayer();
  player.songs.forEach(async (song) => {
    if (!song.stream_url && !checkValidStreamUrl(song.stream_url))
      if (song.youtube_url) {
        console.log("updating stream url: ", song.title);
        playerDAO.updateStreamUrl(
          song,
          await getFromYoutubeLink(song.youtube_url)
        );
      }
  });
}

export async function getStreamUrl(songDTO: SongDTO): Promise<string> {
  const stream_url = songDTO.stream_url;
  const youtube_url = songDTO.youtube_url;
  if (stream_url && checkValidStreamUrl(stream_url)) return stream_url;
  if (youtube_url) {
    const newStreamUrl = await getFromYoutubeLink(youtube_url);
    playerDAO.updateStreamUrl(songDTO, newStreamUrl);
    checkAll();
    return newStreamUrl;
  }
  return "";
}
