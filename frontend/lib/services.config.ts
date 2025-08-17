import { tourMock } from "./mock/services/tour.mock";

const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export const services = {
  tour: USE_MOCK_API ? tourMock : {},
  news: {},
  music: {},
};