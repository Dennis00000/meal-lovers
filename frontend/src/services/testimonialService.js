import { API_URL } from '../config';

export const getTestimonials = async () => {
  try {
    const response = await fetch(`${API_URL}/api/testimonials`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch testimonials');
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
};

export const submitTestimonial = async (testimonialData, token) => {
  try {
    const response = await fetch(`${API_URL}/api/testimonials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(testimonialData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit testimonial');
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error submitting testimonial:', error);
    throw error;
  }
}; 