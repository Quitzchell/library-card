import { SocialMediaGroups } from "@/lib/interfaces/social-media";

export const socialMediaService = {
  async getSocialMediaGroups(): Promise<SocialMediaGroups> {
    return {
      groups: [
        {
          category: "Follow us",
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
