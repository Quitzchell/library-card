import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the API client BEFORE importing the service.
// This replaces the real apiClient with our controllable fake.
vi.mock("@/lib/api/django/client", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

// Now import both the service (which uses apiClient internally)
// and the mocked apiClient (so we can control its return values).
import { apiClient } from "@/lib/api/django/client";
import { tourService } from "@/lib/api/django/repositories";

describe("tourService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── getUpcomingDates ───────────────────────────────────────────────

  describe("getUpcomingDates", () => {
    it("transforms Django response into TourResponse format", async () => {
      const mockDates = [
        {
          id: 1,
          date: "2026-03-01",
          venue: { id: 1, name: "Venue A", city: "City A", country: "NL" },
        },
        {
          id: 2,
          date: "2026-03-02",
          venue: { id: 2, name: "Venue B", city: "City B", country: "NL" },
        },
      ];

      vi.mocked(apiClient.get).mockResolvedValue({
        count: 2,
        next: null,
        previous: null,
        results: mockDates,
      });

      const result = await tourService.getUpcomingDates(1, 5);

      expect(result.data).toEqual(mockDates);
      expect(result.meta).toEqual({
        current_page: 1,
        total_pages: 1, // Math.ceil(2 / 5) = 1
        per_page: 5,
        total: 2,
      });
    });

    it("calls the correct API endpoint", async () => {
      vi.mocked(apiClient.get).mockResolvedValue({
        count: 0,
        next: null,
        previous: null,
        results: [],
      });

      await tourService.getUpcomingDates(2, 10);

      expect(apiClient.get).toHaveBeenCalledWith(
        "/tour/upcoming?page=2&per_page=10",
      );
    });
  });

  // ─── getPastDates ───────────────────────────────────────────────────

  describe("getPastDates", () => {
    it("transforms Django response into TourResponse format", async () => {
      const mockDates = [
        {
          id: 1,
          date: "2024-03-01",
          venue: { id: 1, name: "Venue A", city: "City A", country: "NL" },
        },
        {
          id: 2,
          date: "2024-03-02",
          venue: { id: 2, name: "Venue B", city: "City B", country: "NL" },
        },
      ];

      vi.mocked(apiClient.get).mockResolvedValue({
        count: 2,
        next: null,
        previous: null,
        results: mockDates,
      });

      const result = await tourService.getPastDates(1, 5);

      expect(result.data).toEqual(mockDates);
      expect(result.meta).toEqual({
        current_page: 1,
        total_pages: 1, // Math.ceil(2 / 5) = 1
        per_page: 5,
        total: 2,
      });
    });

    // ─── Pagination math edge cases ─────────────────────────────────
    it("calculates total_pages correctly for edge cases", async () => {
      // count = 0 → total_pages = 0
      vi.mocked(apiClient.get).mockResolvedValue({
        count: 0,
        next: null,
        previous: null,
        results: [],
      });

      const emptyResult = await tourService.getPastDates(1, 5);
      expect(emptyResult.meta!.total_pages).toBe(0);

      // count = perPage + 1 → total_pages = 2
      vi.mocked(apiClient.get).mockResolvedValue({
        count: 6,
        next: "http://api/tour/past?page=2",
        previous: null,
        results: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      });

      const boundaryResult = await tourService.getPastDates(1, 5);
      expect(boundaryResult.meta).toEqual({
        current_page: 1,
        total_pages: 2, // Math.ceil(6 / 5) = 1,2
        per_page: 5,
        total: 6,
      });
    });

    it("calls the correct API endpoint", async () => {
      vi.mocked(apiClient.get).mockResolvedValue({
        count: 0,
        next: null,
        previous: null,
        results: [],
      });

      await tourService.getPastDates(3, 20);

      expect(apiClient.get).toHaveBeenCalledWith(
        "/tour/past?page=3&per_page=20",
      );
    });
  });
});
