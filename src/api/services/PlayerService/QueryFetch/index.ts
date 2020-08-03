import services from "./ServiceRegister";
import ServiceFetcher from "./ServiceFetcher";
import SearchFetcher from "./serviceFetchers/SearchFetcher";
import SongDTO from "../../../dtos/Player/SongDTO";

async function fetcher(service: ServiceFetcher): Promise<Array<SongDTO>> {
  const songs: Array<SongDTO> = await service.fetch();
  return songs;
}

async function searchFetcher(query: string): Promise<Array<SongDTO>> {
  const searchFetcher = new SearchFetcher(query);
  const songs: Array<SongDTO> = await searchFetcher.fetch();
  return songs;
}

export default async (query: string): Promise<Array<SongDTO>> => {
  for (let i: number = 0; i < services.length; i++) {
    const service: ServiceFetcher = new services[i](query);
    if (service.check()) return await fetcher(service);
  }
  return await searchFetcher(query);
};
