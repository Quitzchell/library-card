import { apiClient } from "../client";
import { ImageItemResponse } from "@/lib/interfaces/image";

export const imageService = {
  async getImageItems(page = 1, perPage = 10): Promise<ImageItemResponse> {
    return apiClient.get<ImageItemResponse>(
      `/image?page=${page}&per_page=${perPage}`,
    );
  },
};
