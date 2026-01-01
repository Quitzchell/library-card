import { RichTextItem } from "@/lib/interfaces/rich-text";
import { apiClient } from "@/lib/api/client";

export const biographyService = {
  async getBiography(): Promise<RichTextItem> {
    return apiClient.get<RichTextItem>(`/about?biography`);
  },
};
