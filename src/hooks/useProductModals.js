import { useState, useCallback } from 'react';

export function useProductModals({ addProduct, editProduct, deleteProduct }) {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToView, setProductToView] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
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

  const handleOpenDelete = useCallback((product) => {
    setProductToDelete(product);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setProductToDelete(null);
  }, []);

  const handleFormSubmit = useCallback(async (formData) => {
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

  const handleDeleteConfirm = useCallback(async () => {
    if (!productToDelete) return;
    setIsSubmitting(true);
    try {
      await deleteProduct(productToDelete.id);
      setProductToDelete(null);
    } finally {
      setIsSubmitting(false);
    }
  }, [productToDelete, deleteProduct]);

  return {
    isFormModalOpen,
    productToEdit,
    productToView,
    productToDelete,
    isSubmitting,

    handleOpenCreate,
    handleOpenEdit,
    handleCloseFormModal,
    handleOpenView,
    handleCloseViewModal,
    handleOpenDelete,
    handleCloseDeleteModal,
    handleFormSubmit,
    handleDeleteConfirm,
  };
}
