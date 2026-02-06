import {
  TourDate,
  TourDateDisplay,
  TourResponse,
} from "../../../interfaces/tour";
import { apiClient } from "../client";
import { DjangoPaginatedResponse } from "../interfaces/responses";

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

  async getUpcomingDates(page = 1, perPage = 20): Promise<TourResponse> {
    const response = await apiClient.get<DjangoPaginatedResponse<TourDate>>(
      `/tour/upcoming?pages=${page}&per_page=${perPage}`,
    );

    return {
      data: response.results,
      meta: {
        current_page: page,
        total_pages: Math.ceil(response.count / perPage),
        per_page: perPage,
        total: response.count,
      },
    };
  },

  async getPastDates(page = 1, perPage = 20): Promise<TourResponse> {
    const response = await apiClient.get<DjangoPaginatedResponse<TourDate>>(
      `/tour/past?pages=${page}&per_page=${perPage}`,
    );

    return {
      data: response.results,
      meta: {
        current_page: page,
        total_pages: Math.ceil(response.count / perPage),
        per_page: perPage,
        total: response.count,
      },
    };
  },
};
