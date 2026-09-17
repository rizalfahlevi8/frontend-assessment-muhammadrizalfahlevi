import { useState, useMemo, useCallback } from 'react';

export function useProductFilters(products = []) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !searchTerm.trim() ||
        (p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase().trim()));

      const matchesCategory =
        !categoryFilter || p.category === categoryFilter;

      const matchesStatus =
        !statusFilter || p.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchTerm, categoryFilter, statusFilter]);

  const handleSearchChange = useCallback((val) => {
    setSearchTerm(val);
  }, []);

  const handleCategoryChange = useCallback((val) => {
    setCategoryFilter(val);
  }, []);

  const handleStatusChange = useCallback((val) => {
    setStatusFilter(val);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearchTerm('');
    setCategoryFilter('');
    setStatusFilter('');
  }, []);

  return {
    searchTerm,
    categoryFilter,
    statusFilter,
    filteredProducts,
    handleSearchChange,
    handleCategoryChange,
    handleStatusChange,
    handleResetFilters,
  };
}
