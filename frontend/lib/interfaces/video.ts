export interface VideoItem {
  id: number;
  title: string;
  video_id: string;
  created_at: string;
  updated_at: string;
}

export type VideoItemDisplay = Omit<VideoItem, "created_at" | "updated_at">;

export interface VideoItemResponse {
  data: VideoItemDisplay[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
