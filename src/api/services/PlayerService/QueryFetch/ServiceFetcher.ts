import SongDTO from "../../../dtos/Player/SongDTO";

export interface IServiceFetcher {
  query: string;
  songs?: Array<SongDTO>;
  check(): Boolean;
  fetch(): Promise<Array<SongDTO>>;
}

export default abstract class ServiceFetcher {
  public abstract query: string;
  public abstract songs: Array<SongDTO>;

  abstract check(): Boolean;

  abstract fetch(): Promise<Array<SongDTO>>;

  load(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
