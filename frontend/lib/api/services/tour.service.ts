import { apiClient } from "../client";
import { TourDate, TourResponse } from "../../interfaces/tour";

export const tourService = {
  async getAllDates(): Promise<TourResponse> {
    return apiClient.get<{ data: TourDate[] }>("/tour");
  },

  async getTourDates(page = 1, perPage = 20): Promise<TourResponse> {
    return apiClient.get<TourResponse>(
      `/tour?page=${page}&per_page=${perPage}`,
    );
  },

  async getTourDateById(id: number): Promise<TourResponse> {
    return apiClient.get<{ data: TourDate }>(`/tour/${id}`);
  },

  async getUpcomingDates(): Promise<TourResponse> {
    return apiClient.get<{ data: TourDate[] }>("/tour/upcoming");
  },

  async getPastDates(): Promise<TourResponse> {
    return apiClient.get<{ data: TourDate[] }>("/tour/past");
  },
};
