import { SocialMediaLists } from "@/lib/interfaces/social-media"
import { apiClient } from "../client";

export const SocialMediaService = {
    async getSocialMeidaLists(): Promise<SocialMediaLists> {
        return apiClient.get<SocialMediaLists>(`/social-media`);
    }
}