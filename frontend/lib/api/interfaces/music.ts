export type ServicesVariant = { name: string; url: string };

export interface MusicItem {
  id: number;
  title: string;
  release_date?: string;
  cover_image: string;
  services: Array<ServicesVariant>;
  created_at: string;
  updated_at: string;
}

export type MusicItemDisplay = Omit<MusicItem, "created_at" | "updated_at">;

export interface MusicItemResponse {
  data: MusicItemDisplay[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
