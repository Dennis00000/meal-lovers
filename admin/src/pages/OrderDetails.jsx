import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { API_URL } from '../config';

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data && response.data.success) {
        setOrder(response.data.data);
      } else {
        setError('Order data is not in expected format');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order:', error);
      setError('Failed to load order details');
      setLoading(false);
      
      // Set sample data for demonstration
      setOrder({
        _id: id,
        orderNumber: `ORD-${id.slice(-5)}`,
        user: {
          name: 'John Doe',
          email: 'john@example.com'
        },
        items: [
          {
            product: {
              name: 'Delicious Burger',
              _id: 'prod1'
            },
            quantity: 2,
            price: 12.99
          },
          {
            product: {
              name: 'French Fries',
              _id: 'prod2'
            },
            quantity: 1,
            price: 4.99
          }
        ],
        totalAmount: 30.97,
        deliveryAddress: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          country: 'USA'
        },
        paymentMethod: 'credit_card',
        paymentStatus: 'completed',
        orderStatus: 'delivered',
        createdAt: new Date().toISOString(),
        deliveryDate: new Date(Date.now() + 86400000).toISOString(),
        specialInstructions: 'Please ring the doorbell',
        deliveryFee: 2.99
      });
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdatingStatus(true);
      const token = localStorage.getItem('adminToken');
      await axios.put(
        `${API_URL}/api/orders/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setOrder(prev => ({ ...prev, status: newStatus }));
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: 'bg-yellow-500',
      processing: 'bg-blue-500',
      shipped: 'bg-purple-500',
      delivered: 'bg-green-500',
      cancelled: 'bg-red-500'
    };
    
    return (
      <Badge className={statusColors[status] || 'bg-gray-500'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return <div className="container mx-auto py-6">Loading order details...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <p className="text-red-500 mb-4">{error}</p>
        {order && <p className="text-sm text-gray-500">Showing sample data for demonstration</p>}
      </div>
    );
  }

  if (!order) {
    return <div className="container mx-auto py-6">Order not found</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order #{order.orderNumber || order._id.slice(-5)}</h1>
        <div className="flex space-x-2">
          {order.orderStatus !== 'cancelled' && (
            <Button 
              variant="destructive" 
              onClick={() => handleStatusChange('cancelled')}
            >
              Cancel Order
            </Button>
          )}
          {order.orderStatus === 'placed' && (
            <Button 
              variant="default" 
              onClick={() => handleStatusChange('confirmed')}
            >
              Confirm Order
            </Button>
          )}
          {order.orderStatus === 'confirmed' && (
            <Button 
              variant="default" 
              onClick={() => handleStatusChange('preparing')}
            >
              Start Preparing
            </Button>
          )}
          {order.orderStatus === 'preparing' && (
            <Button 
              variant="default" 
              onClick={() => handleStatusChange('out_for_delivery')}
            >
              Out for Delivery
            </Button>
          )}
          {order.orderStatus === 'out_for_delivery' && (
            <Button 
              variant="success" 
              onClick={() => handleStatusChange('delivered')}
            >
              Mark as Delivered
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Item</th>
                  <th className="text-center py-2">Quantity</th>
                  <th className="text-right py-2">Price</th>
                  <th className="text-right py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{item.product?.name || 'Unknown Product'}</td>
                    <td className="text-center py-2">{item.quantity}</td>
                    <td className="text-right py-2">€{item.price?.toFixed(2) || '0.00'}</td>
                    <td className="text-right py-2">€{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
                {order.deliveryFee > 0 && (
                  <tr className="border-b">
                    <td colSpan={3} className="text-right py-2">Delivery Fee:</td>
                    <td className="text-right py-2">€{order.deliveryFee.toFixed(2)}</td>
                  </tr>
                )}
                <tr className="font-bold">
                  <td colSpan={3} className="text-right py-2">Total:</td>
                  <td className="text-right py-2">€{order.totalAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span>{getStatusBadge(order.orderStatus)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span>{format(new Date(order.createdAt), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment:</span>
                  <Badge variant={order.paymentStatus === 'completed' ? 'success' : 'warning'}>
                    {order.paymentStatus}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Method:</span>
                  <span>{order.paymentMethod.replace('_', ' ')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">{order.user?.name}</span>
                </div>
                <div>
                  <span className="text-gray-500">{order.user?.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Delivery Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div>{order.deliveryAddress?.street}</div>
                <div>{order.deliveryAddress?.city}, {order.deliveryAddress?.state} {order.deliveryAddress?.zipCode}</div>
                <div>{order.deliveryAddress?.country}</div>
              </div>
              {order.specialInstructions && (
                <div className="mt-4">
                  <p className="text-sm font-medium">Special Instructions:</p>
                  <p className="text-sm text-gray-500">{order.specialInstructions}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 