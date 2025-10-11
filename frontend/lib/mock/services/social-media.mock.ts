import { SocialMediaLists } from "@/lib/interfaces/social-media";

export const socialMediaMock = {
  async getSocialMediaList(): Promise<SocialMediaLists> {
    return {
      lists: [
        {
          title: null,
          items: [
            {
              title: "instragram",
              url: "https://www.instagram.com/thisislibrarycard/",
            },
          ],
        },
      ],
    };
  },
};
