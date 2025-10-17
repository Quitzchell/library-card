export interface ImageItem {
  id: number;
  src: string;
  caption?: string | null;
  alt: string;
  created_at: string;
  updated_at: string;
}

export type ImageItemDisplay = Omit<ImageItem, "created_at" | "updated_at">;

export interface ImageItemResponse {
  data: ImageItemDisplay[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
