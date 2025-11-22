import { apiClient } from "../client";
import { TourDate, TourDateDisplay, TourResponse } from "../../interfaces/tour";

export const tourService = {
  async getAllTourDates(): Promise<TourResponse> {
    return apiClient.get<{ data: TourDate[] }>("/tour");
  },

  async getTourDates(page = 1, perPage = 20): Promise<TourResponse> {
    return apiClient.get<TourResponse>(
      `/tour?page=${page}&per_page=${perPage}`,
    );
  },

  async getTourDateById(id: number): Promise<TourDateDisplay> {
    return apiClient.get<TourDateDisplay>(`/tour/${id}`);
  },

  async getUpcomingDates(): Promise<TourResponse> {
    return apiClient.get<{ data: TourDate[] }>("/tour/upcoming");
  },

  async getPastDates(): Promise<TourResponse> {
    return apiClient.get<{ data: TourDate[] }>("/tour/past");
  },
};
