import { describe, it, expect } from 'vitest';
import productsReducer, {
  setLoading,
  setError,
  setProducts,
  optimisticAdd,
  reconcileAdd,
  rollbackAdd,
  optimisticUpdate,
  reconcileUpdate,
  rollbackUpdate,
  optimisticDelete,
  rollbackDelete,
} from '../store/productsSlice';
import toastReducer, {
  addToast,
  removeToast,
  clearToasts,
} from '../store/toastSlice';

describe('productsSlice reducer', () => {
  const initialProductsState = {
    items: [],
    isLoading: true,
    error: null,
  };

  it('handles setLoading and setError', () => {
    let state = productsReducer(initialProductsState, setLoading(false));
    expect(state.isLoading).toBe(false);

    state = productsReducer(state, setError('Network error'));
    expect(state.error).toBe('Network error');
  });

  it('handles setProducts', () => {
    const products = [
      { id: 1, name: 'Product A', price: 100 },
      { id: 2, name: 'Product B', price: 200 },
    ];
    const state = productsReducer(initialProductsState, setProducts(products));
    expect(state.items).toEqual(products);
  });

  it('handles optimisticAdd, reconcileAdd, and rollbackAdd', () => {
    const tempProduct = { id: 999999, name: 'New Keyboard', price: 500000 };

    let state = productsReducer(initialProductsState, optimisticAdd(tempProduct));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].name).toBe('New Keyboard');

    state = productsReducer(
      state,
      reconcileAdd({ tempId: 999999, serverProduct: { id: 5, name: 'New Keyboard Server' } })
    );
    expect(state.items[0].id).toBe(5);
    expect(state.items[0].name).toBe('New Keyboard Server');

    state = productsReducer(state, rollbackAdd(5));
    expect(state.items).toHaveLength(0);
  });

  it('handles optimisticUpdate, reconcileUpdate, and rollbackUpdate', () => {
    const existingState = {
      items: [{ id: 10, name: 'Original Name', price: 100000 }],
      isLoading: false,
      error: null,
    };

    let state = productsReducer(
      existingState,
      optimisticUpdate({ id: 10, updatedData: { name: 'Edited Name', price: 120000 } })
    );
    expect(state.items[0].name).toBe('Edited Name');
    expect(state.items[0].price).toBe(120000);

    state = productsReducer(
      state,
      reconcileUpdate({ id: 10, serverProduct: { id: 10, name: 'Server Confirmed Name' } })
    );
    expect(state.items[0].name).toBe('Server Confirmed Name');

    state = productsReducer(
      state,
      rollbackUpdate({ id: 10, originalProduct: existingState.items[0] })
    );
    expect(state.items[0].name).toBe('Original Name');
  });

  it('handles optimisticDelete and rollbackDelete', () => {
    const originalItem = { id: 1, name: 'To Delete', price: 50000 };
    const existingState = {
      items: [originalItem],
      isLoading: false,
      error: null,
    };

    let state = productsReducer(existingState, optimisticDelete(1));
    expect(state.items).toHaveLength(0);

    state = productsReducer(
      state,
      rollbackDelete({ originalProduct: originalItem, originalIndex: 0 })
    );
    expect(state.items).toHaveLength(1);
    expect(state.items[0].name).toBe('To Delete');
  });
});

describe('toastSlice reducer', () => {
  const initialToastState = {
    toasts: [],
  };

  it('handles addToast and removeToast', () => {
    const toast = { id: 't1', message: 'Success', type: 'success' };
    let state = toastReducer(initialToastState, addToast(toast));
    expect(state.toasts).toHaveLength(1);
    expect(state.toasts[0].message).toBe('Success');

    state = toastReducer(state, removeToast('t1'));
    expect(state.toasts).toHaveLength(0);
  });

  it('handles clearToasts', () => {
    const stateWithToasts = {
      toasts: [
        { id: '1', message: 'A' },
        { id: '2', message: 'B' },
      ],
    };
    const state = toastReducer(stateWithToasts, clearToasts());
    expect(state.toasts).toHaveLength(0);
  });
});
