"use client";

import { useMemo, useState, useCallback } from "react";

/**
 * usePagination
 *
 * Simple pagination hook returning paginated slice and navigation helpers.
 *
 * @param items Array of items to paginate
 * @param pageSize Number of items per page
 * @returns pagination helpers and current page items
 * Time Complexity: O(1) for navigation, O(N) for building page slice
 * Space Complexity: O(1)
 */
export function usePagination<T>(items: readonly T[], pageSize: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(items.length / pageSize)), [items.length, pageSize]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(() => Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  return { currentPage, totalPages, paginated, goToPage, setCurrentPage } as const;
}
