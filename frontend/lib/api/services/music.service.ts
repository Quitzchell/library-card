import { apiClient } from "../client";
import { MusicItemResponse } from "../../interfaces/music";

export const musicService = {
  async getMusicItems(page = 1, perPage = 10): Promise<MusicItemResponse> {
    return apiClient.get<MusicItemResponse>(
      `/music?page=${page}&per_page=${perPage}`,
    );
  },
};
