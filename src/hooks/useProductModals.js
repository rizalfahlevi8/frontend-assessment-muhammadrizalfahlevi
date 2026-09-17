import { useState, useCallback } from 'react';

export function useProductModals() {
  const [productToView, setProductToView] = useState(null);

  const handleOpenView = useCallback((product) => {
    setProductToView(product);
  }, []);

  const handleCloseViewModal = useCallback(() => {
    setProductToView(null);
  }, []);

  return {
    productToView,
    handleOpenView,
    handleCloseViewModal,
  };
}
