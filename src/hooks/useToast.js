import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeToast as removeToastAction,
  showToast as showToastAction,
  showSuccess as showSuccessAction,
  showError as showErrorAction,
  showInfo as showInfoAction,
} from '../store/toastSlice';

export function useToast() {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.toast.toasts);

  const removeToast = useCallback(
    (id) => {
      dispatch(removeToastAction(id));
    },
    [dispatch]
  );

  const addToast = useCallback(
    (toastData) => {
      return dispatch(showToastAction(toastData));
    },
    [dispatch]
  );

  const showSuccess = useCallback(
    (message, options) => {
      return dispatch(showSuccessAction(message, options));
    },
    [dispatch]
  );

  const showError = useCallback(
    (message, options) => {
      return dispatch(showErrorAction(message, options));
    },
    [dispatch]
  );

  const showInfo = useCallback(
    (message, options) => {
      return dispatch(showInfoAction(message, options));
    },
    [dispatch]
  );

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showInfo,
  };
}
