import { apiClient } from "@/lib/api/client";
import { ImageItemResponse } from "@/lib/interfaces/image";
import { GetImageItemsParams } from "../interfaces";

export const imageService = {
  async getImageItems({
    page = 0,
    perPage = 10,
    target = null,
  }: GetImageItemsParams = {}): Promise<ImageItemResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
      ...(target && { target }),
    });

    return apiClient.get<ImageItemResponse>(`/image?${params.toString()}`);
  },
};
