import { createSlice } from '@reduxjs/toolkit';
import { productService } from '../services/productService';
import { showSuccess, showError } from './toastSlice';

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
    optimisticAdd: (state, action) => {
      state.items.unshift(action.payload);
    },
    reconcileAdd: (state, action) => {
      const { tempId, serverProduct } = action.payload;
      const index = state.items.findIndex((item) => item.id === tempId);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...serverProduct,
          id: serverProduct.id || tempId,
        };
      }
    },
    rollbackAdd: (state, action) => {
      const tempId = action.payload;
      state.items = state.items.filter((item) => item.id !== tempId);
    },
    optimisticUpdate: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...updatedData,
          price: Number(updatedData.price),
        };
      }
    },
    reconcileUpdate: (state, action) => {
      const { id, serverProduct } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...serverProduct,
        };
      }
    },
    rollbackUpdate: (state, action) => {
      const { id, originalProduct } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1 && originalProduct) {
        state.items[index] = originalProduct;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setProducts,
  optimisticAdd,
  reconcileAdd,
  rollbackAdd,
  optimisticUpdate,
  reconcileUpdate,
  rollbackUpdate,
} = productsSlice.actions;

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

export const addProduct = (productData) => async (dispatch) => {
  const tempId = Date.now();
  const optimisticProduct = {
    ...productData,
    id: tempId,
    price: Number(productData.price),
    createdAt: new Date().toISOString(),
  };

  dispatch(optimisticAdd(optimisticProduct));
  dispatch(showSuccess(`Product "${optimisticProduct.name}" created successfully`));

  try {
    const serverResponse = await productService.createProduct(productData);
    dispatch(reconcileAdd({ tempId, serverProduct: serverResponse }));
    return true;
  } catch {
    dispatch(rollbackAdd(tempId));
    dispatch(showError(`Failed to save "${productData.name}" to server. Changes rolled back.`));
    return false;
  }
};

export const editProduct = (id, updatedData) => async (dispatch, getState) => {
  const originalProduct = getState().products.items.find((item) => item.id === id);

  dispatch(optimisticUpdate({ id, updatedData }));
  dispatch(showSuccess('Product updated successfully'));

  try {
    const serverResponse = await productService.updateProduct(id, updatedData);
    dispatch(reconcileUpdate({ id, serverProduct: serverResponse }));
    return true;
  } catch {
    if (originalProduct) {
      dispatch(rollbackUpdate({ id, originalProduct }));
    }
    dispatch(showError(`Failed to update product #${id}. Changes rolled back.`));
    return false;
  }
};

export default productsSlice.reducer;
