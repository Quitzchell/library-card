import {
  biographyService,
  teamService,
  imageService,
  musicService,
  socialMediaService,
  tourService,
  videoService,
} from "@/lib/api/django/repositories";
import {
  biographyMock,
  teamMock,
  imageMock,
  musicMock,
  tourMock,
  videoMock,
} from "./mock/services";
import { socialMediaMock } from "./mock/services/social-media.mock";

const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export const services = {
  biography: USE_MOCK_API ? biographyMock : biographyService,
  team: USE_MOCK_API ? teamMock : teamService,
  image: USE_MOCK_API ? imageMock : imageService,
  music: USE_MOCK_API ? musicMock : musicService,
  socialMedia: USE_MOCK_API ? socialMediaMock : socialMediaService,
  tour: USE_MOCK_API ? tourMock : tourService,
  video: USE_MOCK_API ? videoMock : videoService,
};
