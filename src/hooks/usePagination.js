import { useState, useMemo, useCallback } from 'react';

export function usePagination(items = [], itemsPerPage = 5) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const handlePrevPage = useCallback(() => {
    setPage((prev) => Math.max(1, prev - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setPage((prev) => Math.min(totalPages, prev + 1));
  }, [totalPages]);

  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  return {
    currentPage,
    totalPages,
    totalItems: items.length,
    itemsPerPage,
    paginatedItems,
    handlePrevPage,
    handleNextPage,
    resetPage,
    setPage,
  };
}
