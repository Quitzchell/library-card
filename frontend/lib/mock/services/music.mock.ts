import { MusicItemDisplay, MusicItemResponse } from "@/lib/interfaces/music";
import { MusicServiceName } from "@/lib/enums";

export const musicMock = {
  async getMusicItems(page = 1, perPage = 8): Promise<MusicItemResponse> {
    const from = page * perPage - perPage;
    const to = from + perPage;
    const data: MusicItemDisplay[] = MusicItemList.slice(from, to);
    const totalItems = MusicItemList.length;
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

  async getAllMusicItems(): Promise<MusicItemResponse> {
    return {
      data: MusicItemList,
    };
  },
};

// Mockdata
const MusicItemList: Array<MusicItemDisplay> = [
  {
    id: 1,
    title: "Art School",
    release_date: "2025-06-09",
    cover_image: "/images/art-school-artwork.jpg",
    services: [
      {
        name: MusicServiceName.SPOTIFY,
        url: "https://open.spotify.com/track/2pjSXlkwwlqEhoGtUpXeqr?si=27494075ad234820",
      },
      {
        name: MusicServiceName.BANDCAMP,
        url: "https://thisislibrarycard.bandcamp.com/track/art-school",
      },
      {
        name: MusicServiceName.APPLE_MUSIC,
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
        name: MusicServiceName.ATEASE,
        url: "https://shop.atease.ltd/products/library-card-nothing-interesting",
        postfix: "Buy now!",
      },
      {
        name: MusicServiceName.SPOTIFY,
        url: "https://open.spotify.com/album/4wzy3foMTOWeACd3J2FXoC?si=e3fn2cSqQ0CvfQ6wv-MIag",
      },
      {
        name: MusicServiceName.BANDCAMP,
        url: "https://thisislibrarycard.bandcamp.com/album/nothing-interesting",
      },
      {
        name: MusicServiceName.APPLE_MUSIC,
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
        name: MusicServiceName.SPOTIFY,
        url: "https://open.spotify.com/album/5PY6ZHSv3OwcLNwi6qSm8P?si=s7X1JY32RgmKPfTdqA3ecg",
      },
      {
        name: MusicServiceName.BANDCAMP,
        url: "https://thisislibrarycard.bandcamp.com/track/sunflowers",
      },
      {
        name: MusicServiceName.APPLE_MUSIC,
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
        name: MusicServiceName.SPOTIFY,
        url: "https://open.spotify.com/track/0D5W10M58DccbwOOxrdkxM?si=a27b56e81f6a4c2c",
      },
      {
        name: MusicServiceName.BANDCAMP,
        url: "https://thisislibrarycard.bandcamp.com/album/mirror-factory",
      },
      {
        name: MusicServiceName.APPLE_MUSIC,
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
        name: MusicServiceName.ATEASE,
        url: "https://shop.atease.ltd/products/library-card-nothing-interesting",
        postfix: "Buy now!",
      },
      {
        name: MusicServiceName.SPOTIFY,
        url: "https://open.spotify.com/album/4wzy3foMTOWeACd3J2FXoC?si=e3fn2cSqQ0CvfQ6wv-MIag",
      },
      {
        name: MusicServiceName.BANDCAMP,
        url: "https://thisislibrarycard.bandcamp.com/album/nothing-interesting",
      },
      {
        name: MusicServiceName.APPLE_MUSIC,
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
        name: MusicServiceName.SPOTIFY,
        url: "https://open.spotify.com/album/5PY6ZHSv3OwcLNwi6qSm8P?si=s7X1JY32RgmKPfTdqA3ecg",
      },
      {
        name: MusicServiceName.BANDCAMP,
        url: "https://thisislibrarycard.bandcamp.com/track/sunflowers",
      },
      {
        name: MusicServiceName.APPLE_MUSIC,
        url: "https://music.apple.com/us/album/sunflowers-single/1672448083",
      },
    ],
  },
  
];
