import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    toasts: [],
  },
  reducers: {
    addToast: (state, action) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const { addToast, removeToast, clearToasts } = toastSlice.actions;

export const showToast = (toastData) => (dispatch) => {
  const id = Date.now() + Math.random().toString(36).substring(2, 9);
  const duration = toastData.duration !== undefined ? toastData.duration : 4000;
  const newToast = {
    id,
    message: toastData.message,
    type: toastData.type || 'info',
    action: toastData.action || null,
    duration,
  };

  dispatch(addToast(newToast));

  if (duration > 0) {
    setTimeout(() => {
      dispatch(removeToast(id));
    }, duration);
  }

  return id;
};

export const showSuccess = (message, options = {}) => (dispatch) => {
  return dispatch(showToast({ message, type: 'success', ...options }));
};

export const showError = (message, options = {}) => (dispatch) => {
  return dispatch(showToast({ message, type: 'error', duration: 5000, ...options }));
};

export const showInfo = (message, options = {}) => (dispatch) => {
  return dispatch(showToast({ message, type: 'info', ...options }));
};

export default toastSlice.reducer;
