import { createSlice } from '@reduxjs/toolkit';
import { productService } from '../services/productService';
import { showError } from './toastSlice';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setProducts: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setLoading, setError, setProducts } = productsSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const data = await productService.getProducts();
    dispatch(setProducts(Array.isArray(data) ? data : []));
  } catch (err) {
    const msg = err.response?.data?.message || err.message || 'Failed to load products from server.';
    dispatch(setError(msg));
    dispatch(showError(msg));
  } finally {
    dispatch(setLoading(false));
  }
};

export default productsSlice.reducer;
