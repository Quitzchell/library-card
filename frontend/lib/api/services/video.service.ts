import { apiClient } from "../client";
import { VideoItemResponse } from "../../interfaces/video";

export const videoService = {
  async getVideoItems(page = 1, perPage = 10): Promise<VideoItemResponse> {
    return apiClient.get<VideoItemResponse>(
      `/video?page=${page}&per_page=${perPage}`,
    );
  },
};
