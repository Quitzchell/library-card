export interface MusicItem {
  id: number;
  title: string;
  release_date?: string;
  cover_image?: string;
  spotify_url?: string;
  bandcamp_item?: BandCampItem;
  apple_music_url?: string;
  created_at: string;
  updated_at: string;
}

export type BandCampItem = { type: string; id: string }

export type MusicItemDisplay = Omit<MusicItem, "created_at" | "updated_at">

export interface MusicItemResponse {
  data: MusicItemDisplay[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// https://thisislibrarycard.bandcamp.com/track/art-school
