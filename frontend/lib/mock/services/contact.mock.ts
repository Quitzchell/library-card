import { ContactListItems } from "@/lib/interfaces/contact";

export const contactMock = {
  async getContactListItems(): Promise<ContactListItems> {
    return {
      items: [
        {
          title: "Bookings",
          contacts: [
            {
              prefix: "NL",
              postfix: null,
              contact: "r.coppen@friendlyfire.nl",
            },
            {
              prefix: "BE",
              postfix: null,
              contact: "bjorn@busker.be",
            },
          ],
        },
      ],
    };
  },
};
