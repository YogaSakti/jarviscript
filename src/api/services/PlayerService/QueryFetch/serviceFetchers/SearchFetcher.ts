import ServiceFetcher from "../ServiceFetcher";
import SongDTO from "../../../../dtos/Player/SongDTO";
import request from "request";

class SearchFetcher extends ServiceFetcher {
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

  async fetch(): Promise<SongDTO[]> {
    await request.get(this.query);
    return [
      {
        title: "teste",
      },
    ];
  }
}

export default SearchFetcher;
