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
import { musicService } from "@/lib/api/django/repositories";

describe("musicService", () => {
  // Reset all mocks before each test so tests don't leak state.
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getReleases", () => {
    // ─── Basic transformation ───────────────────────────────────────
    // The Django API returns { count, results, next, previous }.
    // The service should transform this into { data, meta }.
    it("transforms Django response into ReleaseResponse format", async () => {
      const mockReleases = [
        { id: 1, title: "Album A", cover_image: "/img/a.jpg" },
        { id: 2, title: "Album B", cover_image: "/img/b.jpg" },
      ];

      // Configure our mock to return a fake Django response.
      // that fits entirely on one page.
      vi.mocked(apiClient.get).mockResolvedValue({
        count: 2,
        next: null,
        previous: null,
        results: mockReleases,
      });

      const result = await musicService.getReleases(1, 4);

      // Verify the field mapping: results → data
      expect(result.data).toEqual(mockReleases);
      // Verify meta is constructed correctly
      expect(result.meta).toEqual({
        current_page: 1,
        total_pages: 1, // Math.ceil(2 / 4) = 1
        per_page: 4,
        total: 2,
      });
    });

    // ─── Pagination math: exact fit ─────────────────────────────────
    // When count exactly equals perPage, there should be exactly 1 page.
    it("calculates total_pages = 1 when count equals perPage", async () => {
      vi.mocked(apiClient.get).mockResolvedValue({
        count: 4,
        next: null,
        previous: null,
        results: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      });

      const result = await musicService.getReleases(1, 4);

      expect(result.meta!.total_pages).toBe(1);
    });

    // ─── Pagination math: off-by-one ────────────────────────────────
    // count = perPage + 1 should produce 2 pages (not 1).
    // This is the classic off-by-one boundary for Math.ceil.
    it("calculates total_pages = 2 when count is perPage + 1", async () => {
      vi.mocked(apiClient.get).mockResolvedValue({
        count: 5,
        next: "http://api/music/?page=2",
        previous: null,
        results: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      });

      const result = await musicService.getReleases(1, 4);

      expect(result.meta!.total_pages).toBe(2);
    });

    // ─── Empty collection ───────────────────────────────────────────
    // When there are 0 results, total_pages should be 0.
    // Math.ceil(0 / 4) = 0, which is correct.
    it("returns total_pages = 0 for an empty collection", async () => {
      vi.mocked(apiClient.get).mockResolvedValue({
        count: 0,
        next: null,
        previous: null,
        results: [],
      });

      const result = await musicService.getReleases(1, 4);

      expect(result.data).toEqual([]);
      expect(result.meta!.total_pages).toBe(0);
      expect(result.meta!.total).toBe(0);
    });

    // ─── Correct API endpoint ───────────────────────────────────────
    // Verify the service calls the right endpoint with query params.
    it("calls the correct API endpoint with page and perPage", async () => {
      vi.mocked(apiClient.get).mockResolvedValue({
        count: 0,
        next: null,
        previous: null,
        results: [],
      });

      await musicService.getReleases(2, 8);

      expect(apiClient.get).toHaveBeenCalledWith("/music/?page=2&per_page=8");
    });
  });
});
