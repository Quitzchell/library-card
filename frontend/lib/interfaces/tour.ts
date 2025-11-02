export interface TourDate {
  id: number;
  date: Date;
  venue: string;
  city: string;
  country: string;
  ticket_url?: string;
  sold_out?: boolean;
  description?: string;
  created_at: string;
  updated_at: string;
}

export type TourDateDisplay = Omit<TourDate, "created_at" | "updated_at">;

export interface TourResponse {
  data: TourDateDisplay[];
  meta: {
    current_page: number;
    total_pages: number;
    per_page: number;
    total: number;
  };
}
