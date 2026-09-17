import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProducts as fetchProductsAction,
  addProduct as addProductAction,
  editProduct as editProductAction,
  deleteProduct as deleteProductAction,
} from '../store/productsSlice';

export function useProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const isLoading = useSelector((state) => state.products.isLoading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProductsAction());
  }, [dispatch]);

  const fetchProducts = useCallback(() => {
    return dispatch(fetchProductsAction());
  }, [dispatch]);

  const addProduct = useCallback(
    (productData) => {
      return dispatch(addProductAction(productData));
    },
    [dispatch]
  );

  const editProduct = useCallback(
    (id, updatedData) => {
      return dispatch(editProductAction(id, updatedData));
    },
    [dispatch]
  );

  const deleteProduct = useCallback(
    (id) => {
      return dispatch(deleteProductAction(id));
    },
    [dispatch]
  );

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    addProduct,
    editProduct,
    deleteProduct,
  };
}
