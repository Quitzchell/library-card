import { tourService, newsService, musicService } from "./api/services";
import { tourMock, musicMock } from "./mock/services";

const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export const services = {
  tour: USE_MOCK_API ? tourMock : tourService,
  news: USE_MOCK_API ? {} : newsService,
  music: USE_MOCK_API ? musicMock : musicService,
};
