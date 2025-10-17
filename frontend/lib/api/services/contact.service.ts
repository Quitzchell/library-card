import { ContactLists } from "@/lib/interfaces/contact";
import { apiClient } from "../client";

export const contactService = {
  async getContactLists(): Promise<ContactLists> {
    return apiClient.get<ContactLists>(`/contact`);
  },
};
