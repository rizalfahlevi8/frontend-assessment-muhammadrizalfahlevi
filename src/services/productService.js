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

  async createProduct(productData) {
    const payload = {
      ...productData,
      createdAt: productData.createdAt || new Date().toISOString(),
    };
    const response = await apiClient.post('/products', payload);
    return response.data;
  },

  async updateProduct(id, productData) {
    const response = await apiClient.patch(`/products/${id}`, productData);
    return response.data;
  },
};
