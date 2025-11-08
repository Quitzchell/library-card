"use client";

import { usePagination } from "@/hooks/usePagination";
import { MusicItemResponse } from "@/lib/interfaces/music";
import { services } from "@/lib/services.config";
import { useEffect, useState } from "react";
import PaginationContainer from "../common/Pagination";
import MusicList from "../common/MusicList";
import { useResponsivePerPage } from "@/hooks/useResponsivePerPage";
import { TailwindScreens } from "@/lib/enums/tailwind-screen";

export default function MusicContainer() {
  const PER_PAGE = useResponsivePerPage(
    [
      { query: `(min-width: ${TailwindScreens.MD})`, value: 8 },
      { query: `(min-width: ${TailwindScreens.SM})`, value: 4 },
    ],
    4,
  );

  const [musicItems, setMusicItems] = useState<MusicItemResponse>({
    data: [],
    meta: { current_page: 1, total_pages: 1, per_page: 0, total: 1 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { total_pages } = musicItems.meta;

  const { currentPage, handleNext, handlePrev, handleNumber } =
    usePagination(total_pages);

  const emptySlots = Math.max(0, PER_PAGE - musicItems.data.length);

  useEffect(() => {
    const fetchMusicItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await services.music.getMusicItems(
          currentPage,
          PER_PAGE,
        );
        setMusicItems(response);
      } catch (err) {
        console.error("Error fetching music items: ", err);
        setError("Failed to load music items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMusicItems();
  }, [currentPage, PER_PAGE]);

  return (
    <section className="flex h-full flex-col justify-center space-y-5">
      {loading && <p>Loading music items...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && musicItems.data.length === 0 && (
        <p>No tour dates found.</p>
      )}

      {!loading && !error && musicItems.data.length > 0 && (
        <>
          <section>
            <MusicList musicItems={musicItems} emptySlots={emptySlots} />
          </section>
          <PaginationContainer
            totalPages={total_pages}
            currentPage={currentPage}
            handleNext={handleNext}
            handlePrev={handlePrev}
            handleNumber={handleNumber}
          />
        </>
      )}
    </section>
  );
}
