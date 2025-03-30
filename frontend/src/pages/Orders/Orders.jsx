const fetchOrders = async () => {
  setLoading(true);
  try {
    const response = await api.get('/api/orders');
    setOrders(response.data.data || []);
    setError(null);
  } catch (err) {
    console.error('Error fetching orders:', err);
    setError('Failed to load orders. Please try again later.');
  } finally {
    setLoading(false);
  }
}; 