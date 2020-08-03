import ServiceFetcher from "../ServiceFetcher";
import SongDTO from "../../../../dtos/Player/SongDTO";

class SpotifyFetcher extends ServiceFetcher {
  public query: string;
  public songs: SongDTO[];

  constructor(query: string) {
    super();
    this.query = query;
    this.songs = [];
  }

  check(): Boolean {
    return false;
    // throw new Error("Method not implemented.");
  }
  fetch(): Promise<SongDTO[]> {
    throw new Error("Method not implemented.");
  }
}

export default SpotifyFetcher;
