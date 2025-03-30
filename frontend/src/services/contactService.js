import api from '../lib/api';

export const submitContactForm = async (formData) => {
  const response = await api.post('/contact', formData);
  return response.data;
}; 