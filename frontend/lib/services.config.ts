import { tourService, musicService, videoService, biographyService } from "./api/services";
import { tourMock, musicMock, videoMock, biographyMock } from "./mock/services";


const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export const services = {
  tour: USE_MOCK_API ? tourMock : tourService,
  music: USE_MOCK_API ? musicMock : musicService,
  video: USE_MOCK_API ? videoMock : videoService,
  biography: USE_MOCK_API ? biographyMock : biographyService,
};
