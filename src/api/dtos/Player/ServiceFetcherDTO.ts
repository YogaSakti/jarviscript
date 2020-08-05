import SongDTO from "./SongDTO";

interface IServiceFetcherDTO {
  qtd_added: number;
  playlist_name?: string;
  service_name: string;
  songs: Array<SongDTO>;
}

export default class ServiceFetcherDTO implements IServiceFetcherDTO {
  qtd_added: number;
  playlist_name?: string;
  service_name: string;
  songs: Array<SongDTO>;

  constructor(iServiceFetcherDTO: IServiceFetcherDTO) {
    this.qtd_added = iServiceFetcherDTO.qtd_added;
    this.playlist_name = iServiceFetcherDTO.playlist_name;
    this.service_name = iServiceFetcherDTO.service_name;
    this.songs = iServiceFetcherDTO.songs;
  }
}
