import { StreamingServiceName } from "@/lib/enums";

export type Service = {
  name: StreamingServiceName;
  url: string;
  prefix?: string;
  postfix?: string;
};

export interface Release {
  id: number;
  title: string;
  release_date?: string;
  cover_image: string;
  services: Array<Service>;
  created_at: string;
  updated_at: string;
}

export type ReleaseDisplay = Omit<Release, "created_at" | "updated_at">;

export interface ReleaseResponse {
  data: ReleaseDisplay[];
  meta?: {
    current_page: number;
    total_pages: number;
    per_page: number;
    total: number;
  };
}
