"use client";

import { usePagination } from "@/hooks/usePagination";
import { useResponsivePerPage } from "@/hooks/useResponsivePerPage";
import { TailwindScreens } from "@/lib/enums/tailwind-screen";
import { useMemo } from "react";
import MusicList from "./MusicList";
import PaginationContainer from "../common/Pagination";
import { MusicItemDisplay } from "@/lib/interfaces/music";

export default function MusicClient({ items }: { items: MusicItemDisplay[] }) {
  const PER_PAGE = useResponsivePerPage(
    [
      { query: `(min-width: ${TailwindScreens.MD})`, value: 8 },
      { query: `(min-width: ${TailwindScreens.SM})`, value: 4 },
    ],
    4,
  );

  const totalPages = Math.ceil(items.length / PER_PAGE);
  const { currentPage, handleNext, handlePrev, handleNumber } =
    usePagination(totalPages);

  const paginated = useMemo(() => {
    let start;
    if (currentPage > totalPages) {
      start = (currentPage - 2) * PER_PAGE;
    } else {
      start = (currentPage - 1) * PER_PAGE;
    }

    return items.slice(start, start + PER_PAGE);
  }, [currentPage, totalPages, items, PER_PAGE]);

  const emptySlots = Math.max(0, PER_PAGE - paginated.length);

  return (
    <section className="flex h-full flex-col justify-center space-y-5">
      <MusicList musicItems={{ data: paginated }} emptySlots={emptySlots} />

      <PaginationContainer
        totalPages={totalPages}
        currentPage={currentPage}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleNumber={handleNumber}
      />
    </section>
  );
}
