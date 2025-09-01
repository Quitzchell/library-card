import { apiClient } from "../client";

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  image?: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface NewsResponse {
  data: NewsItem[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const newsService = {
  async getAll(page = 1, perPage = 10): Promise<NewsResponse> {
    return apiClient.get<NewsResponse>(
      `/news?page=${page}&per_page=${perPage}`,
    );
  },

  async getById(id: number): Promise<{ data: NewsItem }> {
    return apiClient.get<{ data: NewsItem }>(`/news/${id}`);
  },
};
