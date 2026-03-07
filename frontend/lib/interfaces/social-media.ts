export interface SocialMediaGroup {
  category: string | null;
  items: Array<SocialMediaLink>;
}

export interface SocialMediaLink {
  icon: string;
  url: string;
}

export interface SocialMediaGroups {
  groups: Array<SocialMediaGroup>;
}
