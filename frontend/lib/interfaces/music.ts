import { MusicServiceName } from "@/lib/enums";

export type ServiceVariant = {
  name: MusicServiceName;
  url: string;
  prefix?: string;
  postfix?: string;
};

export interface MusicItem {
  id: number;
  title: string;
  release_date?: string;
  cover_image: string;
  services: Array<ServiceVariant>;
  created_at: string;
  updated_at: string;
}

export type MusicItemDisplay = Omit<MusicItem, "created_at" | "updated_at">;

export interface MusicItemResponse {
  data: MusicItemDisplay[];
  meta: {
    current_page: number;
    total_pages: number;
    per_page: number;
    total: number;
  };
}
