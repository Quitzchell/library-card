import { StreamingServiceName } from "@/lib/enums";
import { Release, ReleaseResponse } from "@/lib/interfaces/music";

export const musicMock = {
  async getReleases(page = 1, perPage = 8): Promise<ReleaseResponse> {
    const from = page * perPage - perPage;
    const to = from + perPage;
    const data: Release[] = ReleaseList.slice(from, to);
    const totalItems = ReleaseList.length;
    const totalPages = Math.ceil(totalItems / perPage);

    return {
      data: data,
      meta: {
        current_page: page,
        total_pages: totalPages,
        per_page: perPage,
        total: totalItems,
      },
    };
  },

  async getReleaseById(id: number): Promise<Release | null> {
    const item = ReleaseList.find((m) => m.id === id);

    return item ?? null;
  },

  async getAllReleases(): Promise<ReleaseResponse> {
    return {
      data: ReleaseList,
    };
  },
};

// Mockdata
const ReleaseList: Array<Release> = [
  {
    id: 1,
    title: "Art School",
    release_date: "2025-06-09",
    cover_image: "/images/art-school-artwork.jpg",
    services: [
      {
        name: StreamingServiceName.SPOTIFY,
        url: "https://open.spotify.com/track/2pjSXlkwwlqEhoGtUpXeqr?si=27494075ad234820",
      },
      {
        name: StreamingServiceName.BANDCAMP,
        url: "https://thisislibrarycard.bandcamp.com/track/art-school",
      },
      {
        name: StreamingServiceName.APPLE_MUSIC,
        url: "https://music.apple.com/us/song/art-school/1823574040",
      },
    ],
  },
  {
    id: 2,
    title: "Nothing, Interesting",
    release_date: "2024-03-15",
    cover_image: "/images/nothing-interesting-artwork.jpg",
    services: [
      {
        name: StreamingServiceName.ATEASE,
        url: "https://shop.atease.ltd/products/library-card-nothing-interesting",
        postfix: "Buy now!",
      },
      {
        name: StreamingServiceName.SPOTIFY,
        url: "https://open.spotify.com/album/4wzy3foMTOWeACd3J2FXoC?si=e3fn2cSqQ0CvfQ6wv-MIag",
      },
      {
        name: StreamingServiceName.BANDCAMP,
        url: "https://thisislibrarycard.bandcamp.com/album/nothing-interesting",
      },
      {
        name: StreamingServiceName.APPLE_MUSIC,
        url: "https://music.apple.com/us/album/nothing-interesting-ep/1722176456",
      },
    ],
  },
  {
    id: 3,
    title: "Sunflowers",
    release_date: "2023-03-09",
    cover_image: "/images/sunflowers-artwork.jpg",
    services: [
      {
        name: StreamingServiceName.SPOTIFY,
        url: "https://open.spotify.com/album/5PY6ZHSv3OwcLNwi6qSm8P?si=s7X1JY32RgmKPfTdqA3ecg",
      },
      {
        name: StreamingServiceName.BANDCAMP,
        url: "https://thisislibrarycard.bandcamp.com/track/sunflowers",
      },
      {
        name: StreamingServiceName.APPLE_MUSIC,
        url: "https://music.apple.com/us/album/sunflowers-single/1672448083",
      },
    ],
  },
  {
    id: 4,
    title: "Mirror Factory",
    release_date: "2022-06-15",
    cover_image: "/images/mirror-factory-artwork.jpg",
    services: [
      {
        name: StreamingServiceName.SPOTIFY,
        url: "https://open.spotify.com/track/0D5W10M58DccbwOOxrdkxM?si=a27b56e81f6a4c2c",
      },
      {
        name: StreamingServiceName.BANDCAMP,
        url: "https://thisislibrarycard.bandcamp.com/album/mirror-factory",
      },
      {
        name: StreamingServiceName.APPLE_MUSIC,
        url: "https://music.apple.com/us/song/mirror-factory/1625081184",
      },
    ],
  },
  {
    id: 2,
    title: "Nothing, Interesting",
    release_date: "2024-03-15",
    cover_image: "/images/nothing-interesting-artwork.jpg",
    services: [
      {
        name: StreamingServiceName.ATEASE,
        url: "https://shop.atease.ltd/products/library-card-nothing-interesting",
        postfix: "Buy now!",
      },
      {
        name: StreamingServiceName.SPOTIFY,
        url: "https://open.spotify.com/album/4wzy3foMTOWeACd3J2FXoC?si=e3fn2cSqQ0CvfQ6wv-MIag",
      },
      {
        name: StreamingServiceName.BANDCAMP,
        url: "https://thisislibrarycard.bandcamp.com/album/nothing-interesting",
      },
      {
        name: StreamingServiceName.APPLE_MUSIC,
        url: "https://music.apple.com/us/album/nothing-interesting-ep/1722176456",
      },
    ],
  },
  {
    id: 3,
    title: "Sunflowers",
    release_date: "2023-03-09",
    cover_image: "/images/sunflowers-artwork.jpg",
    services: [
      {
        name: StreamingServiceName.SPOTIFY,
        url: "https://open.spotify.com/album/5PY6ZHSv3OwcLNwi6qSm8P?si=s7X1JY32RgmKPfTdqA3ecg",
      },
      {
        name: StreamingServiceName.BANDCAMP,
        url: "https://thisislibrarycard.bandcamp.com/track/sunflowers",
      },
      {
        name: StreamingServiceName.APPLE_MUSIC,
        url: "https://music.apple.com/us/album/sunflowers-single/1672448083",
      },
    ],
  },
];
