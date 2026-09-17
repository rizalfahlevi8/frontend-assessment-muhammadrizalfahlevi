import { useState, useCallback } from 'react';

export function useProductModals({ addProduct, editProduct } = {}) {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToView, setProductToView] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenCreate = useCallback(() => {
    setProductToEdit(null);
    setIsFormModalOpen(true);
  }, []);

  const handleOpenEdit = useCallback((product) => {
    setProductToEdit(product);
    setIsFormModalOpen(true);
  }, []);

  const handleCloseFormModal = useCallback(() => {
    setIsFormModalOpen(false);
    setProductToEdit(null);
  }, []);

  const handleOpenView = useCallback((product) => {
    setProductToView(product);
  }, []);

  const handleCloseViewModal = useCallback(() => {
    setProductToView(null);
  }, []);

  const handleFormSubmit = useCallback(async (formData) => {
    if (!addProduct && !editProduct) return;
    setIsSubmitting(true);
    try {
      if (productToEdit) {
        await editProduct(productToEdit.id, formData);
      } else {
        await addProduct(formData);
      }
      setIsFormModalOpen(false);
      setProductToEdit(null);
    } finally {
      setIsSubmitting(false);
    }
  }, [productToEdit, editProduct, addProduct]);

  return {
    isFormModalOpen,
    productToEdit,
    productToView,
    isSubmitting,

    handleOpenCreate,
    handleOpenEdit,
    handleCloseFormModal,
    handleOpenView,
    handleCloseViewModal,
    handleFormSubmit,
  };
}
