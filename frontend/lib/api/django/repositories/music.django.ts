import { apiClient } from "@/lib/api/django/client";
import { Release, ReleaseResponse } from "@/lib/interfaces/music";
import { DjangoPaginatedResponse } from "../interfaces/responses";

export const musicService = {
  async getReleases(page = 1, perPage = 4): Promise<ReleaseResponse> {
    const response = await apiClient.get<DjangoPaginatedResponse<Release>>(
      `/music/?page=${page}&per_page=${perPage}`,
    );

    return {
      data: response.results,
      meta: {
        current_page: page,
        total_pages: Math.ceil(response.count / perPage),
        per_page: perPage,
        total: response.count,
      },
    };
  },

  async getReleaseById(id: number): Promise<Release> {
    return apiClient.get<Release>(`/music/${id}`);
  },

  async getAllReleases(): Promise<ReleaseResponse> {
    return apiClient.get<ReleaseResponse>(`/music`);
  },
};
