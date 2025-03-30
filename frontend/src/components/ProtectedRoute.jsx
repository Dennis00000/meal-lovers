import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { isLoggedIn, loading, currentUser } = useAuth();
  
  useEffect(() => {
    console.log('ProtectedRoute - Auth State:', { 
      isLoggedIn, 
      loading, 
      hasUser: !!currentUser,
      userData: currentUser
    });
  }, [isLoggedIn, loading, currentUser]);
  
  if (loading) {
    console.log('ProtectedRoute - Loading...');
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }
  
  if (!isLoggedIn) {
    console.log('ProtectedRoute - Not logged in, redirecting to login');
    return <Navigate to="/login" />;
  }
  
  console.log('ProtectedRoute - User is authenticated, rendering protected content');
  return <Outlet />;
};

export default ProtectedRoute; 