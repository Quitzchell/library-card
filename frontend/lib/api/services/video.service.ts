import { apiClient } from "@/lib/api/client";
import {
  VideoItemDisplay,
  VideosByCategoryResponse,
} from "@/lib/interfaces/video";
import { PaginatedResponse } from "@/lib/interfaces/paginated-response";

export const videoService = {
  async getVideoItems(
    page = 1,
    perPage = 10,
  ): Promise<PaginatedResponse<VideoItemDisplay>> {
    return apiClient.get<PaginatedResponse<VideoItemDisplay>>(
      `/video?page=${page}&per_page=${perPage}`,
    );
  },

  async getVideoItemById(id: number): Promise<VideoItemDisplay | null> {
    return apiClient.get<VideoItemDisplay>(`/video/${id}`);
  },

  async getVideosByCategory(): Promise<VideosByCategoryResponse> {
    return apiClient.get<VideosByCategoryResponse>(`/video`);
  },
};
