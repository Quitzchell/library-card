import { ContactLists } from "@/lib/interfaces/contact";

export const contactMock = {
  async getContactLists(): Promise<ContactLists> {
    return {
      lists: [
        {
          title: "Bookings",
          items: [
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
