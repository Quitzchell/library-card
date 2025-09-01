import {
  MusicItemDisplay,
  MusicItemResponse,
} from "@/lib/api/interfaces/music";

export const musicMock = {
  async getMusicItems(page = 0, perPage = 10): Promise<MusicItemResponse> {
    const from = page * perPage;
    const to = from + perPage;
    const data: MusicItemDisplay[] = MusicItemList.slice(from, to)
    const totalItems = MusicItemList.length
    const lastPage = Math.ceil(totalItems / perPage)
    
    return {
      data: data,
      meta: {
        current_page: page,
        last_page: lastPage,
        per_page: perPage,
        total: totalItems,
      },
    };
  },
};

// Mockdata
const MusicItemList: Array<MusicItemDisplay> = [
  {
    id: 1,
    title: "Art School",
    release_date: "2025-06-09",
    cover_image: "",
    spotify_url:
      "https://open.spotify.com/track/2pjSXlkwwlqEhoGtUpXeqr?si=27494075ad234820",
    bandcamp_item: { type: "track", id: "920608957" },
    //  "https://thisislibrarycard.bandcamp.com/track/art-school",
    apple_music_url: "https://music.apple.com/us/song/art-school/1823574040",
  },
  {
    id: 2,
    title: "Nothing, Interesting",
    release_date: "2024-03-15",
    cover_image: "",
    spotify_url:
      "https://open.spotify.com/album/4wzy3foMTOWeACd3J2FXoC?si=e3fn2cSqQ0CvfQ6wv-MIag",
    bandcamp_item: { type: "album", id: "3263517600" },
    // "https://thisislibrarycard.bandcamp.com/album/nothing-interesting",
    apple_music_url:
      "https://music.apple.com/us/album/nothing-interesting-ep/1722176456",
  },
  {
    id: 3,
    title: "Sunflowers",
    release_date: "2023-03-09",
    cover_image: "",
    spotify_url:
      "https://open.spotify.com/album/5PY6ZHSv3OwcLNwi6qSm8P?si=s7X1JY32RgmKPfTdqA3ecg",
    bandcamp_item: { type: "track", id: "1895054307" },
    // "https://thisislibrarycard.bandcamp.com/track/sunflowers",
    apple_music_url:
      "https://music.apple.com/us/album/sunflowers-single/1672448083",
  },
  {
    id: 4,
    title: "Mirror Factory",
    release_date: "2022-06-15",
    cover_image: "",
    spotify_url:
      "https://open.spotify.com/track/0D5W10M58DccbwOOxrdkxM?si=a27b56e81f6a4c2c",
    bandcamp_item: { type: "album", id: "1542218183" },
    // "https://thisislibrarycard.bandcamp.com/album/mirror-factory",
    apple_music_url:
      "https://music.apple.com/us/song/mirror-factory/1625081184",
  },
];
