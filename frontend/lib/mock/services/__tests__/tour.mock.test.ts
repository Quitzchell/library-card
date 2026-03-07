import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { tourMock } from "../tour.mock";

describe("tourMock", () => {
  // ─── Fake timer setup ──────────────────────────────────────────────
  // We freeze time at July 1, 2025 00:00:00 UTC.
  // The mock data has 7 dates in Jan 2025 (past) and 9 dates in Jan 2026 (upcoming).
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-07-01T00:00:00Z"));
  });

  // Always restore real timers so other test files aren't affected.
  afterEach(() => {
    vi.useRealTimers();
  });

  // ─── Upcoming dates ─────────────────────────────────────────────────

  describe("getUpcomingDates", () => {
    // With time frozen at July 1, 2025, all Jan 2026 dates (IDs 8-16)
    // should be "upcoming" because they're in the future.
    it("returns only future dates", async () => {
      const result = await tourMock.getUpcomingDates(1, 100);

      expect(result.data.length).toBeGreaterThan(0);
      const now = new Date();
      result.data.forEach((tourDate) => {
        expect(tourDate.date.getTime()).toBeGreaterThan(now.getTime());
      });
    });

    // Upcoming dates should be sorted ascending (soonest show first).
    // This is the natural order for a user looking at "what's next".
    it("sorts upcoming dates ascending (soonest first)", async () => {
      const result = await tourMock.getUpcomingDates(1, 100);

      for (let i = 1; i < result.data.length; i++) {
        expect(result.data[i].date.getTime()).toBeGreaterThanOrEqual(
          result.data[i - 1].date.getTime(),
        );
      }
    });

    // Pagination meta should reflect the FILTERED count, not all dates.
    it("returns correct pagination meta for filtered results", async () => {
      const perPage = 3;
      const result = await tourMock.getUpcomingDates(1, perPage);

      expect(result.meta).toBeDefined();
      expect(result.meta!.current_page).toBe(1);
      expect(result.meta!.per_page).toBe(perPage);
      expect(result.data.length).toBeLessThanOrEqual(perPage);
      // total should be the count of ALL upcoming dates, not just this page
      expect(result.meta!.total).toBeGreaterThan(0);
      expect(result.meta!.total_pages).toBe(
        Math.ceil(result.meta!.total / perPage),
      );
    });
  });

  // ─── Past dates ─────────────────────────────────────────────────────

  describe("getPastDates", () => {
    // With time frozen at July 1, 2025, all Jan 2025 dates (IDs 1-7)
    // should be "past" because they've already happened.
    it("returns only past dates", async () => {
      const result = await tourMock.getPastDates(1, 100);

      expect(result.data.length).toBeGreaterThan(0);
      const now = new Date();
      result.data.forEach((tourDate) => {
        expect(tourDate.date.getTime()).toBeLessThanOrEqual(now.getTime());
      });
    });

    // Past dates should be sorted descending (most recent show first).
    // This lets users see what they just missed at the top.
    it("sorts past dates descending (most recent first)", async () => {
      const result = await tourMock.getPastDates(1, 100);

      for (let i = 1; i < result.data.length; i++) {
        expect(result.data[i].date.getTime()).toBeLessThanOrEqual(
          result.data[i - 1].date.getTime(),
        );
      }
    });

    // Same as upcoming: meta reflects filtered count.
    it("returns correct pagination meta for filtered results", async () => {
      const perPage = 2;
      const result = await tourMock.getPastDates(1, perPage);

      expect(result.meta).toBeDefined();
      expect(result.meta!.current_page).toBe(1);
      expect(result.meta!.per_page).toBe(perPage);
      expect(result.data.length).toBeLessThanOrEqual(perPage);
      // total should be the count of ALL past dates, not just this page
      expect(result.meta!.total).toBeGreaterThan(0);
      expect(result.meta!.total_pages).toBe(
        Math.ceil(result.meta!.total / perPage),
      );
    });
  });

  // ─── getTourDateById ────────────────────────────────────────────────

  describe("getTourDateById", () => {
    it("returns the correct tour date for a valid ID", async () => {
      const tourDate = await tourMock.getTourDateById(1);

      expect(tourDate).not.toBeNull();
      expect(tourDate!.id).toBe(1);
      expect(tourDate!.venue).toBeDefined();
    });

    it("returns null for a non-existent ID", async () => {
      const tourDate = await tourMock.getTourDateById(999);

      expect(tourDate).toBeNull();
    });
  });

  // ─── getTourDates (unfiltered pagination) ───────────────────────────

  describe("getTourDates", () => {
    it("returns paginated results with correct meta", async () => {
      const result = await tourMock.getTourDates(1, 5);

      expect(result.data).toHaveLength(5);
      expect(result.meta!.current_page).toBe(1);
      expect(result.meta!.per_page).toBe(5);
      expect(result.meta!.total).toBe(16);
      expect(result.meta!.total_pages).toBe(4);
    });

    it("returns remaining items on the last page", async () => {
      // 16 items / 5 per page = 4 pages. Last page has 1 item.
      const result = await tourMock.getTourDates(4, 5);

      expect(result.data).toHaveLength(1);
    });
  });
});
