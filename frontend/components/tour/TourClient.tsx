"use client";

import { usePagination } from "@/hooks/usePagination";
import { TourDateDisplay } from "@/lib/interfaces/tour";
import { useMemo } from "react";
import TourList from "../common/TourList";
import PaginationContainer from "../common/Pagination";
import { TourDateEnum } from "@/lib/enums/tour";

export default function TourClient({
  items,
  direction,
}: {
  items: TourDateDisplay[];
  direction: TourDateEnum;
}) {
  const PER_PAGE = 4;

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
    <section className="flex flex-col space-y-5">
      <section className="grid gap-4">
        <TourList
          tourDates={{ data: paginated }}
          direction={direction}
          emptySlots={emptySlots}
        />
      </section>
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
