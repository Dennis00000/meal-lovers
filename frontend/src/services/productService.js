import api from '../lib/api';

export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getProductsByCategory = async (categoryId) => {
  const response = await api.get('/products', { 
    params: { category: categoryId } 
  });
  return response.data;
};

export const getFeaturedProducts = async () => {
  const response = await api.get('/products', { 
    params: { featured: true } 
  });
  return response.data;
}; 