import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaBox, FaShoppingCart, FaUsers, FaCog, FaSignOutAlt, FaUtensils } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { Box, Typography, Avatar, Divider } from '@mui/material';

export default function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' : 'text-gray-300 hover:bg-blue-800 hover:text-white';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Modern Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-950 text-white shadow-xl">
        <div className="p-6 flex items-center space-x-3">
          <FaUtensils className="text-2xl text-blue-400" />
          <Typography variant="h5" className="font-bold tracking-wide">Meal Lovers</Typography>
        </div>
        
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 2 }} />
        
        <div className="px-6 py-4">
          <div className="flex items-center space-x-3">
            <Avatar 
              sx={{ 
                bgcolor: 'primary.main',
                width: 40,
                height: 40,
                fontSize: '1rem'
              }}
            >
              {user?.name?.charAt(0) || 'A'}
            </Avatar>
            <div>
              <Typography variant="subtitle2" className="font-medium">{user?.name || 'Admin'}</Typography>
              <Typography variant="caption" className="text-gray-400">{user?.role || 'Administrator'}</Typography>
            </div>
          </div>
        </div>
        
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 2 }} />
        
        <nav className="mt-2 px-3">
          <Link to="/" className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${isActive('/')}`}>
            <FaHome className="mr-3" /> Dashboard
          </Link>
          <Link to="/products" className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${isActive('/products')}`}>
            <FaBox className="mr-3" /> Products
          </Link>
          <Link to="/orders" className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${isActive('/orders')}`}>
            <FaShoppingCart className="mr-3" /> Orders
          </Link>
          <Link to="/users" className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${isActive('/users')}`}>
            <FaUsers className="mr-3" /> Users
          </Link>
          <Link to="/settings" className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${isActive('/settings')}`}>
            <FaCog className="mr-3" /> Settings
          </Link>
        </nav>
        
        <div className="absolute bottom-0 w-64 p-4">
          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />
          <button 
            onClick={handleLogout} 
            className="flex items-center px-4 py-3 w-full text-left text-gray-300 hover:bg-red-700 hover:text-white rounded-lg transition-all duration-200"
          >
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
} 