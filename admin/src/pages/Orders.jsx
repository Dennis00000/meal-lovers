import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Tooltip
} from '@mui/material'
import { FaEye, FaSearch } from 'react-icons/fa'
import { format } from 'date-fns'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from '../config'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setOrders(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders');
      toast.error('Failed to load orders');
      setLoading(false);
    }
  }

  const getStatusChip = (status) => {
    const statusColors = {
      pending: { bg: '#FEF3C7', color: '#D97706' },
      processing: { bg: '#DBEAFE', color: '#2563EB' },
      shipped: { bg: '#C7D2FE', color: '#4F46E5' },
      delivered: { bg: '#D1FAE5', color: '#059669' },
      cancelled: { bg: '#FEE2E2', color: '#DC2626' },
      default: { bg: '#E5E7EB', color: '#374151' }
    };
    
    const style = statusColors[status] || statusColors.default;
    
    return (
      <Chip 
        label={status.charAt(0).toUpperCase() + status.slice(1)} 
        sx={{ 
          bgcolor: style.bg, 
          color: style.color,
          fontWeight: 'medium',
          border: `1px solid ${style.color}20`
        }} 
      />
    );
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center', mt: 10 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>
          Loading orders...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, bgcolor: '#FFF5F5', color: '#E53E3E' }}>
          <Typography variant="h6">{error}</Typography>
          <Button variant="outlined" color="primary" onClick={fetchOrders} sx={{ mt: 2 }}>
            Try Again
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
            Orders
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage customer orders
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<FaSearch />}
            sx={{ borderRadius: 2 }}
          >
            Search
          </Button>
        </Box>
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#F7FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order._id} hover>
                    <TableCell>{order.orderNumber || `ORD-${order._id.slice(-5)}`}</TableCell>
                    <TableCell>{order.user?.name || 'Unknown'}</TableCell>
                    <TableCell>
                      {order.createdAt ? format(new Date(order.createdAt), 'MMM dd, yyyy') : 'N/A'}
                    </TableCell>
                    <TableCell>€{order.totalAmount?.toFixed(2) || '0.00'}</TableCell>
                    <TableCell>{getStatusChip(order.status)}</TableCell>
                    <TableCell>
                      <Tooltip title="View Details">
                        <IconButton 
                          component={Link} 
                          to={`/orders/${order._id}`}
                          color="primary"
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(66, 153, 225, 0.1)',
                            '&:hover': { bgcolor: 'rgba(66, 153, 225, 0.2)' }
                          }}
                        >
                          <FaEye />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <Typography color="text.secondary">No orders found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  )
} 