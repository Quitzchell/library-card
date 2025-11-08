import { useState } from "react";

export function usePagination(totalPages: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleNumber = (i: number) => setCurrentPage(i + 1);

  return {
    currentPage,
    setCurrentPage,
    handlePrev,
    handleNext,
    handleNumber,
  };
}
