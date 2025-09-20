import { BiographyItem } from "@/lib/interfaces/biography";
import { apiClient } from "../client";

export const biographyService = {
  async getBiography(): Promise<BiographyItem> {
    return apiClient.get<BiographyItem>(`/about?biography`);
  },
};
