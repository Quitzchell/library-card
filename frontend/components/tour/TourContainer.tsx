"use client";

import { useEffect, useState } from "react";
import { TourResponse } from "@/lib/interfaces/tour";
import { services } from "@/lib/services.config";
import TourList from "../common/TourList";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { cn } from "@/utils/classnames";

export default function TourContainer() {
  const [tourDates, setTourDates] = useState<TourResponse>({
    data: [],
    meta: { current_page: 1, total_pages: 1, per_page: 0, total: 1 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTourDates = async () => {
      try {
        const response = await services.tour.getTourDates(tourDates.meta.current_page, 4);
        setTourDates(response);
      } catch (error) {
        console.error("Error fetching tour dates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTourDates();
  }, [tourDates.meta.current_page]);

  if (loading) return <p>Loading tour dates...</p>;

  const { total_pages, current_page } = tourDates.meta;
  const canGoPrev = current_page > 1;
  const canGoNext = current_page < total_pages;

  console.log(total_pages, current_page);

  return (
    <section className="space-y-5">
      {tourDates.data.length > 0 ? (
        <TourList tourDates={tourDates} />
      ) : (
        <p>No tour dates found.</p>
      )}

      {total_pages !== 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={!canGoPrev}
                className={cn(!canGoPrev && "pointer-events-none opacity-50")}
                onClick={() =>
                  canGoPrev &&
                  setTourDates((prev) => ({
                    ...prev,
                    meta: {
                      ...prev.meta,
                      current_page: prev.meta.current_page - 1,
                    },
                  }))
                }
              />
            </PaginationItem>

            {Array.from({ length: total_pages }).map((_, i) => (
              <PaginationItem key={i+1}>
                <PaginationLink
                  className={cn(
                    "flex items-center justify-center",
                    i+1 === current_page &&
                      "pointer-events-none bg-neutral-300 opacity-50",
                  )}
                  onClick={() =>
                    setTourDates((prev) => ({
                      ...prev,
                      meta: {
                        ...prev.meta,
                        current_page: i+1,
                      },
                    }))
                  }
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                aria-disabled={!canGoNext}
                className={!canGoNext ? "pointer-events-none opacity-50" : ""}
                onClick={() =>
                  canGoNext &&
                  setTourDates((prev) => ({
                    ...prev,
                    meta: {
                      ...prev.meta,
                      current_page: prev.meta.current_page + 1,
                    },
                  }))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
}
