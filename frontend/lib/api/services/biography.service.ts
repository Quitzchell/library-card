import { apiClient } from "@/lib/api/client";
import { Biography } from "@/lib/interfaces/biography";

export const biographyService = {
  async getBiography(): Promise<Biography> {
    return apiClient.get<Biography>(`/about?biography`);
  },
};
