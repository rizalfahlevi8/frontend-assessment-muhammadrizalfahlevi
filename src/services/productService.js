import { apiClient } from '../lib/axios';

export const productService = {
  async getProducts(params = {}) {
    const response = await apiClient.get('/products', { params });
    return response.data;
  },

  async getProductById(id) {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },
};
