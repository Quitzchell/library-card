import { apiClient } from "../client";
import { VideoItemDisplay, VideoItemResponse } from "../../interfaces/video";

export const videoService = {
  async getVideoItems(page = 1, perPage = 10): Promise<VideoItemResponse> {
    return apiClient.get<VideoItemResponse>(
      `/video?page=${page}&per_page=${perPage}`,
    );
  },

  async getVideoItemById(id: number): Promise<VideoItemDisplay | null> {
    return apiClient.get<VideoItemDisplay>(`/video/${id}`);
  },

  async getAllVideoItems(): Promise<VideoItemResponse> {
    return apiClient.get<VideoItemResponse>(`/video`);
  },
};
