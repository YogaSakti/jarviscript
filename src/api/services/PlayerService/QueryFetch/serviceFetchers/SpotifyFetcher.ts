import ServiceFetcher from "../ServiceFetcher";
import SongDTO from "../../../../dtos/Player/SongDTO";
import ServiceFetcherDTO from "../../../../dtos/Player/ServiceFetcherDTO";

class SpotifyFetcher extends ServiceFetcher {
  public serviceName: string = "Spotify";
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
  fetch(): Promise<ServiceFetcherDTO> {
    throw new Error("Method not implemented.");
  }
}

export default SpotifyFetcher;
