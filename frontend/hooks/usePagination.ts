import { useCallback, useState } from "react";

export function usePagination(totalPages: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNext = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const handlePrev = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleNumber = useCallback(
    (page: number) => {
      setCurrentPage(page + 1);
    },
    [],
  );
  return {
    currentPage,
    setCurrentPage,
    handlePrev,
    handleNext,
    handleNumber,
  };
}
