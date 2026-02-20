import { apiClient } from "@/lib/api/django/client";
import { ImageItemResponse } from "@/lib/interfaces/image";

export const imageService = {
  async getImageItems({
    page = 0,
    perPage = 10,
    target = undefined,
  }): Promise<ImageItemResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
    });

    target ? params.append("target", target) : null;

    return apiClient.get<ImageItemResponse>(`/image?${params.toString()}`);
  },
};
