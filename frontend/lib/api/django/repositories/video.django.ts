import { apiClient } from "@/lib/api/django/client";
import { VideoCategory } from "@/lib/enums/video-category";
import { VideoResponse } from "@/lib/interfaces/video";

export const videoService = {
  async getVideoItems({
    take,
    category,
  }: {
    take?: number;
    category?: VideoCategory;
  } = {}): Promise<VideoResponse> {
    const params = new URLSearchParams();

    if (take) params.set("take", take.toString());
    if (category) params.set("category", category);

    const query = params.toString();
    return apiClient.get<VideoResponse>(`/video${query ? `?${query}` : ""}`);
  },
};
