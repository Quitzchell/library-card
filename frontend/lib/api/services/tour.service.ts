import { apiClient } from "../client";
import { TourDate, TourResponse } from "../interfaces/tour";

export const tourService = {
  async getTourDates(page = 1, perPage = 20): Promise<TourResponse> {
    return apiClient.get<TourResponse>(
      `/tour?page=${page}&per_page=${perPage}`,
    );
  },

  async getTourDateById(id: number): Promise<{ data: TourDate }> {
    return apiClient.get<{ data: TourDate }>(`/tour/${id}`);
  },

  async getUpcomingDates(): Promise<{ data: TourDate[] }> {
    return apiClient.get<{ data: TourDate[] }>("/tour/upcoming");
  },

  async getPastDates(): Promise<{ data: TourDate[] }> {
    return apiClient.get<{ data: TourDate[] }>("/tour/past");
  },
};
