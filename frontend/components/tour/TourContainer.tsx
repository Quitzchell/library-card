"use client";

import { useEffect, useState } from "react";
import { TourResponse } from "@/lib/interfaces/tour";
import { services } from "@/lib/services.config";
import TourList from "./TourList";
import PaginationContainer from "../common/Pagination";
import { TourDateEnum } from "@/lib/enums/tour";

const PER_PAGE = 4;

export default function TourContainer({
  direction,
}: {
  direction: TourDateEnum;
}) {
  const [tourDates, setTourDates] = useState<TourResponse>({
    data: [],
    meta: { current_page: 1, total_pages: 1, per_page: 0, total: 1 },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { total_pages } = tourDates.meta;

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, total_pages));
  const handleNumber = (i: number) => setCurrentPage(i + 1);

  useEffect(() => {
    const fetchTourDates = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await services.tour.getTourDates(
          currentPage,
          PER_PAGE,
          direction,
        );
        setTourDates(response);
      } catch (err) {
        console.error("Error fetching tour dates:", err);
        setError("Failed to load tour dates. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTourDates();
  }, [currentPage, direction]);

  return (
    <section className="flex flex-col space-y-5">
      {loading && <p>Loading tour dates...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && tourDates.data.length === 0 && (
        <p>No tour dates found.</p>
      )}

      {!loading && !error && tourDates.data.length > 0 && (
        <>
          <section className="grid min-h-112 gap-4">
            <TourList tourDates={tourDates} direction={direction} />
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
