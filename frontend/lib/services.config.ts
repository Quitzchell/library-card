import {
  biographyService,
  contactService,
  imageService,
  musicService,
  tourService,
  videoService,
} from "./api/services";
import { SocialMediaService } from "./api/services/social-media.service";
import {
  biographyMock,
  contactMock,
  imageMock,
  musicMock,
  tourMock,
  videoMock,
} from "./mock/services";
import { socialMediaMock } from "./mock/services/social-media.mock";

const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export const services = {
  biography: USE_MOCK_API ? biographyMock : biographyService,
  contact: USE_MOCK_API ? contactMock : contactService,
  image: USE_MOCK_API ? imageMock : imageService,
  music: USE_MOCK_API ? musicMock : musicService,
  socialMedia: USE_MOCK_API ? socialMediaMock : SocialMediaService,
  tour: USE_MOCK_API ? tourMock : tourService,
  video: USE_MOCK_API ? videoMock : videoService,
};
