import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, CircularProgress, Button } from '@mui/material';
import { FaUsers, FaShoppingCart, FaMoneyBillWave, FaBoxOpen } from 'react-icons/fa';
import axios from 'axios';
import { API_URL } from '../config';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const [stats, setStats] = useState({
    userCount: 0,
    orderCount: 0,
    revenue: 0,
    productCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/api/admin/dashboard-stats`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setStats(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setError('Failed to load dashboard statistics');
      toast.error('Failed to load dashboard statistics');
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        height: '100%',
        background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`,
        color: 'white',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)'
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {value}
          </Typography>
        </Box>
        <Box sx={{ 
          p: 2, 
          borderRadius: '50%', 
          bgcolor: 'rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </Box>
      </Box>
    </Paper>
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center', mt: 10 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>
          Loading dashboard data...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, bgcolor: '#FFF5F5', color: '#E53E3E' }}>
          <Typography variant="h6">{error}</Typography>
          <Button variant="outlined" color="primary" onClick={fetchStats} sx={{ mt: 2 }}>
            Try Again
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to your admin dashboard. Here's an overview of your business.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Users" 
            value={stats.userCount} 
            icon={<FaUsers size={24} />} 
            color="#4C51BF"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Orders" 
            value={stats.orderCount} 
            icon={<FaShoppingCart size={24} />} 
            color="#38A169"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Revenue" 
            value={`€${stats.revenue.toFixed(2)}`} 
            icon={<FaMoneyBillWave size={24} />} 
            color="#DD6B20"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Products" 
            value={stats.productCount} 
            icon={<FaBoxOpen size={24} />} 
            color="#3182CE"
          />
        </Grid>
      </Grid>

      {/* You can add more sections here like recent orders, popular products, etc. */}
    </Container>
  );
} 