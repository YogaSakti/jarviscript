import SongDTO from "../../../dtos/Player/SongDTO";
import ServiceFetcherDTO from "../../../dtos/Player/ServiceFetcherDTO";

export interface IServiceFetcher {
  query: string;
  songs?: Array<SongDTO>;
  check(): Boolean;
  fetch(): Promise<Array<SongDTO>>;
}

export default abstract class ServiceFetcher {
  public abstract query: string;
  public abstract songs: Array<SongDTO>;
  public abstract serviceName: string;

  abstract check(): Boolean;

  abstract fetch(): Promise<ServiceFetcherDTO>;

  load(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
