import { apiClient } from "@/lib/api/django/client";
import { VideoResponse } from "@/lib/interfaces/video";

export const videoService = {
  async getVideoItems({
    take,
  }: {
    take?: number;
  } = {}): Promise<VideoResponse> {
    return take
      ? apiClient.get<VideoResponse>(`/video?take=${take}`)
      : apiClient.get<VideoResponse>(`/video`);
  },

  async getVideoItemsByCategory(category: string): Promise<VideoResponse> {
    return apiClient.get<VideoResponse>(`/video?category=${category}`);
  },
};
