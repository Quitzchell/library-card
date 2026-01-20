import { ReleaseDisplay, ReleaseResponse } from "../../interfaces/music";
import { apiClient } from "../client";

export const musicService = {
  async getReleases(page = 1, perPage = 10): Promise<ReleaseResponse> {
    return apiClient.get<ReleaseResponse>(
      `/music?page=${page}&per_page=${perPage}`,
    );
  },

  async getReleaseById(id: number): Promise<ReleaseDisplay> {
    return apiClient.get<ReleaseDisplay>(`/music/${id}`);
  },

  async getAllReleases(): Promise<ReleaseResponse> {
    return apiClient.get<ReleaseResponse>(`/music`);
  },
};
