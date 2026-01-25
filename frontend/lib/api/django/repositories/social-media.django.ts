import { SocialMediaLists } from "@/lib/interfaces/social-media";

export const SocialMediaService = {
  async getSocialMediaList(): Promise<SocialMediaLists> {
    return {
      lists: [
        {
          title: "Follow us",
          items: [
            {
              icon: "FaInstagram",
              url: "https://www.instagram.com/thisislibrarycard/",
            },
          ],
        },
      ],
    };
  },
};
