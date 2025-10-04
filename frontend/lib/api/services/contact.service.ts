import { ContactListItems } from "@/lib/interfaces/contact";
import { apiClient } from "../client";

export const contactService = {
    async getContactListItems(): Promise<ContactListItems> {
        return apiClient.get<ContactListItems>(`/contact`);
    }
}