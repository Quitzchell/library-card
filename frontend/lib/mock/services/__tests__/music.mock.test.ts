import { describe, expect, it } from "vitest";
import { musicMock } from "../music.mock";

describe("musicMock", () => {
  // ─── getReleases pagination ─────────────────────────────────────────

  describe("getReleases", () => {
    // Basic pagination: page 1 with a perPage that's the total count
    // should return all items.
    it("returns the first page of releases with correct meta", async () => {
      const result = await musicMock.getReleases(1, 4);
      expect(result.data).toHaveLength(4);
      expect(result.meta).toBeDefined();
      expect(result.meta!.current_page).toBe(1);
      expect(result.meta!.per_page).toBe(4);
      expect(result.meta!.total_pages).toBe(1);
      expect(result.meta!.total).toBe(4);
    });

    // Smaller page size forces a second page to exist.
    it("returns the correct slice for page 2", async () => {
      const page1 = await musicMock.getReleases(1, 2);
      const page2 = await musicMock.getReleases(2, 2);

      expect(page1.data).toHaveLength(2);
      expect(page2.data).toHaveLength(2);
      expect(page2.meta!.current_page).toBe(2);
      expect(page2.meta!.total_pages).toBe(2);

      // Pages should contain different items
      const page1Ids = page1.data.map((r) => r.id);
      const page2Ids = page2.data.map((r) => r.id);
      expect(page1Ids).not.toEqual(page2Ids);
    });

    // Requesting a page beyond the data should return an empty array.
    // This prevents crashes when a user navigates to a deleted page.
    it("returns empty data for a page beyond available data", async () => {
      const result = await musicMock.getReleases(100, 4);

      expect(result.data).toHaveLength(0);
      expect(result.meta!.current_page).toBe(100);
      // total_pages should still reflect the actual data count
      expect(result.meta!.total_pages).toBe(1);
    });
  });

  // ─── getReleaseById ─────────────────────────────────────────────────

  describe("getReleaseById", () => {
    // Looking up a valid ID should return the matching release.
    it("returns the correct release for a valid ID", async () => {
      const release = await musicMock.getReleaseById(1);

      expect(release).not.toBeNull();
      expect(release!.id).toBe(1);
      expect(release!.title).toBeDefined();
    });

    // Looking up a non-existent ID should return null, not undefined
    // or throw an error. This is important for the UI to show a
    // "not found" state instead of crashing.
    it("returns null for a non-existent ID", async () => {
      const release = await musicMock.getReleaseById(999);

      expect(release).toBeNull();
    });
  });

  // ─── getAllReleases ─────────────────────────────────────────────────

  describe("getAllReleases", () => {
    it("returns all releases without pagination meta", async () => {
      const result = await musicMock.getAllReleases();

      expect(result.data.length).toBeGreaterThan(0);
      expect(result.meta).toBeUndefined();
    });
  });
});
