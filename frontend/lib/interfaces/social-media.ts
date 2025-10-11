export interface SocialMediaItem {
    title: string;
    url: string
}

export interface SocialMediaList {
    title: string | null;
    items: Array<SocialMediaItem>
}

export interface SocialMediaLists {
    lists: Array<SocialMediaList>
}