import ServiceFetcher from "../ServiceFetcher";
import SongDTO from "../../../../dtos/Player/SongDTO";
import request from "request";
import ServiceFetcherDTO from "../../../../dtos/Player/ServiceFetcherDTO";

class SearchFetcher extends ServiceFetcher {
  public serviceName: string = "Youtube Search";
  public query: string;
  public songs: SongDTO[];

  constructor(query: string) {
    super();
    this.query = query;
    this.songs = [];
  }

  check(): Boolean {
    return true;
  }

  async fetch(): Promise<ServiceFetcherDTO> {
    await request.get(this.query);
    throw new Error("Method not implemented.");
  }
}

export default SearchFetcher;
