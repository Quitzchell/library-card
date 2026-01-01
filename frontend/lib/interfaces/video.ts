import { VideoCategory } from "../enums/video";

export interface VideoItem {
  id: number;
  title: string;
  video_id: string;
  category: VideoCategory;
  created_at: string;
  updated_at: string;
}

export type VideoItemDisplay = Omit<VideoItem, "created_at" | "updated_at">;

export type VideosByCategory = Record<VideoCategory, VideoItemDisplay[]>;

export interface VideosByCategoryResponse {
  data: VideosByCategory;
}
