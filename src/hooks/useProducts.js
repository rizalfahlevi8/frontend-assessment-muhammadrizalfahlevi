import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts as fetchProductsAction } from '../store/productsSlice';

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

  return {
    products,
    isLoading,
    error,
    fetchProducts,
  };
}
