export interface SocialMediaList {
    title: string | null;
    items: Array<SocialMediaItem>
}

export interface SocialMediaItem {
  icon: string;
  url: string;
}

export interface SocialMediaLists {
    lists: Array<SocialMediaList>
}