// src/hooks/usePagination.js
import { useState, useMemo } from "react";

/**
 * Hook pagination générique
 * @param {Object} param0 
 * @param {number} param0.totalItems - total d'éléments
 * @param {number} param0.itemsPerPage - éléments par page
 * @param {number} param0.initialPage - page de départ
 * @returns {Object} { currentPage, totalPages, nextPage, prevPage, goToPage, sliceData }
 */
export default function usePagination({
  totalItems = 0,
  itemsPerPage = 10,
  initialPage = 1,
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalItems / itemsPerPage)), [totalItems, itemsPerPage]);

  const startIndex = useMemo(() => (currentPage - 1) * itemsPerPage, [currentPage, itemsPerPage]);

  const endIndex = useMemo(() => Math.min(startIndex + itemsPerPage, totalItems), [startIndex, totalItems, itemsPerPage]);

  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  const nextPage = () => { if (canGoNext) setCurrentPage((p) => p + 1); };
  const prevPage = () => { if (canGoPrev) setCurrentPage((p) => p - 1); };
  const goToPage = (pageNumber) => {
    const page = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(page);
  };

  const sliceData = (data) => data.slice(startIndex, endIndex);

  return {
    currentPage,
    totalPages,
    canGoNext,
    canGoPrev,
    nextPage,
    prevPage,
    goToPage,
    sliceData,
    startIndex,
    endIndex,
  };
}
