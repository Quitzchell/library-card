import { apiClient } from "../client";
import { MusicItemDisplay, MusicItemResponse } from "../../interfaces/music";

export const musicService = {
  async getMusicItems(page = 1, perPage = 10): Promise<MusicItemResponse> {
    return apiClient.get<MusicItemResponse>(
      `/music?page=${page}&per_page=${perPage}`,
    );
  },

  async getMusicItemById(id: number): Promise<MusicItemDisplay> {
      return apiClient.get<MusicItemDisplay>(`/music/${id}`);
  },

  async getAllMusicItems(): Promise<MusicItemResponse> {
    return apiClient.get<MusicItemResponse>(
      `/music`,
    );
  }
};
