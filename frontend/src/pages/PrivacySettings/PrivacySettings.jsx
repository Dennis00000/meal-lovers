import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaArrowLeft, FaSpinner, FaExclamationTriangle, FaCheckCircle, FaShieldAlt, FaBell, FaGlobe, FaUserShield } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './PrivacySettings.css';

const PrivacySettings = () => {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [settings, setSettings] = useState({
    marketingEmails: true,
    orderNotifications: true,
    promotionalSMS: false,
    shareDataWithPartners: false,
    activityTracking: true,
    locationServices: false,
    twoFactorAuth: false
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call your API here
      // const response = await api.post('/api/users/privacy-settings', settings);
      
      setSuccess(true);
      toast.success('Privacy settings updated successfully');
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Error updating privacy settings:', err);
      toast.error('Failed to update privacy settings');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)] pt-20">
        <div className="text-center">
          <FaSpinner className="animate-spin text-blue-500 text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-700">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)] pt-20">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <FaExclamationTriangle className="text-yellow-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Not Logged In</h2>
          <p className="mb-6 text-gray-600">Please log in to manage your privacy settings</p>
          <Link 
            to="/login" 
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 inline-block"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl pt-20">
      <div className="mb-5">
        <Link to="/profile-page" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <FaArrowLeft className="mr-2" />
          <span>Back to Profile</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-5 text-white">
          <h1 className="text-xl md:text-2xl font-bold">Privacy Settings</h1>
          <p className="text-blue-100 mt-1 text-sm">Manage how your data is used and shared</p>
        </div>
        
        <div className="p-5">
          {success && (
            <div className="mb-4 bg-green-50 text-green-700 p-3 rounded-md text-sm flex items-center">
              <FaCheckCircle className="mr-2" />
              Your privacy settings have been updated successfully
            </div>
          )}
          
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <FaBell className="text-gray-500 mr-2" />
                Communication Preferences
              </h2>
              
              <div className="space-y-3 pl-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-sm text-gray-500">Receive emails about new products and promotions</p>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={settings.marketingEmails} 
                      onChange={() => handleToggle('marketingEmails')}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order Notifications</p>
                    <p className="text-sm text-gray-500">Receive updates about your orders</p>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={settings.orderNotifications} 
                      onChange={() => handleToggle('orderNotifications')}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Promotional SMS</p>
                    <p className="text-sm text-gray-500">Receive text messages about deals and offers</p>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={settings.promotionalSMS} 
                      onChange={() => handleToggle('promotionalSMS')}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <FaGlobe className="text-gray-500 mr-2" />
                Data Sharing
              </h2>
              
              <div className="space-y-3 pl-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Share Data with Partners</p>
                    <p className="text-sm text-gray-500">Allow us to share your data with trusted partners</p>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={settings.shareDataWithPartners} 
                      onChange={() => handleToggle('shareDataWithPartners')}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Activity Tracking</p>
                    <p className="text-sm text-gray-500">Allow us to track your activity on our platform</p>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={settings.activityTracking} 
                      onChange={() => handleToggle('activityTracking')}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Location Services</p>
                    <p className="text-sm text-gray-500">Allow us to use your location for better service</p>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={settings.locationServices} 
                      onChange={() => handleToggle('locationServices')}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <FaShieldAlt className="text-gray-500 mr-2" />
                Security
              </h2>
              
              <div className="space-y-3 pl-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={settings.twoFactorAuth} 
                      onChange={() => handleToggle('twoFactorAuth')}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t flex justify-end">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300 flex items-center"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-white rounded-lg shadow-md p-5">
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <FaUserShield className="text-gray-500 mr-2" />
          Your Data Rights
        </h2>
        <p className="text-sm text-gray-600 mb-3">
          Under data protection laws, you have rights including:
        </p>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Your right to access your personal data</li>
          <li>• Your right to correct any inaccurate personal data</li>
          <li>• Your right to request deletion of your personal data</li>
          <li>• Your right to restrict or object to processing of your data</li>
        </ul>
        <div className="mt-4">
          <Link to="/data-request" className="text-blue-600 hover:text-blue-800 text-sm">
            Request a copy of your data
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings; 