import { apiClient } from "@/lib/api/django/client";
import { PaginatedResponse } from "@/lib/interfaces/paginated-response";
import {
  VideoItemDisplay,
  VideosByCategoryResponse,
} from "@/lib/interfaces/video";

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
