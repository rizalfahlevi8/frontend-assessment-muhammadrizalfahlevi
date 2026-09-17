import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import toastReducer from './toastSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    toast: toastReducer,
  },
});

export default store;
