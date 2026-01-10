"use client";

import { usePagination } from "@/hooks/usePagination";
import { TourDateDisplay } from "@/lib/interfaces/tour";
import { useMemo } from "react";
import TourList from "@/components/tour/TourList";
import PaginationContainer from "@/components/common/Pagination";
import { TourDateEnum } from "@/lib/enums/tour";
import SectionTitle from "@/components/common/SectionTitle";

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

  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PER_PAGE;

  const paginated = useMemo(() => {
    return items.slice(start, start + PER_PAGE);
  }, [items, start]);

  const emptySlots = Math.max(0, PER_PAGE - paginated.length);

  return (
    <div className="space-y-12">
      <SectionTitle
        title={
          direction === TourDateEnum.UPCOMING
            ? "Upcoming Shows"
            : "Previous Shows"
        }
      />
      <section className="container flex flex-col space-y-5">
        <section className="grid gap-4">
          {totalPages > 1 ? (
            <TourList
              tourDates={{ data: paginated }}
              direction={direction}
              emptySlots={emptySlots}
            />
          ) : (
            <p>No upcoming shows</p>
          )}
        </section>
        {totalPages > 1 && (
          <PaginationContainer
            totalPages={totalPages}
            currentPage={currentPage}
            handleNext={handleNext}
            handlePrev={handlePrev}
            handleNumber={handleNumber}
          />
        )}
      </section>
    </div>
  );
}
