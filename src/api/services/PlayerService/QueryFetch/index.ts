import services from "./ServiceRegister";
import ServiceFetcher from "./ServiceFetcher";
import SearchFetcher from "./serviceFetchers/SearchFetcher";
import SongDTO from "../../../dtos/Player/SongDTO";
import ServiceFetcherDTO from "../../../dtos/Player/ServiceFetcherDTO";

async function fetcher(service: ServiceFetcher): Promise<ServiceFetcherDTO> {
  const result: ServiceFetcherDTO = await service.fetch();
  return result;
}

async function searchFetcher(query: string): Promise<ServiceFetcherDTO> {
  const searchFetcher = new SearchFetcher(query);
  const result: ServiceFetcherDTO = await searchFetcher.fetch();
  return result;
}

export default async (query: string): Promise<ServiceFetcherDTO> => {
  for (let i: number = 0; i < services.length; i++) {
    const service: ServiceFetcher = new services[i](query);
    if (service.check()) return await fetcher(service);
  }
  return await searchFetcher(query);
};
