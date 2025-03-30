import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from '../services/authService';
import { toast } from 'react-toastify';
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, 
  FaSave, FaSignOutAlt, FaShoppingBag, FaUtensils, FaHeadset,
  FaSpinner, FaExclamationTriangle, FaStar, FaComment, FaCamera, FaCheck,
  FaHistory, FaCreditCard, FaHeart, FaBell, FaShieldAlt, FaCog
} from 'react-icons/fa';
import api from '../services/api';

const ProfilePage = () => {
  const { currentUser, isLoggedIn, loading: authLoading, logout, updateUserData } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profileImage: null,
    imagePreview: null
  });
  
  const [activeTab, setActiveTab] = useState('profile');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [testimonialText, setTestimonialText] = useState('');
  const [submittingTestimonial, setSubmittingTestimonial] = useState(false);
  const [userTestimonials, setUserTestimonials] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoggedIn && !authLoading) {
      navigate('/login');
    }
    
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        profileImage: currentUser.profileImage || null,
        imagePreview: currentUser.profileImage || null
      });
      
      // Fetch user testimonials
      fetchUserTestimonials();
      
      // Fetch user orders
      fetchUserOrders();
    }
  }, [currentUser, isLoggedIn, authLoading, navigate]);
  
  const fetchUserTestimonials = async () => {
    try {
      const response = await api.get('/api/testimonials/user');
      if (response.data && response.data.data) {
        setUserTestimonials(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };
  
  const fetchUserOrders = async () => {
    setLoadingOrders(true);
    try {
      const response = await api.get('/api/orders');
      if (response.data && response.data.data) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const updatedUser = await updateProfile({
        ...formData,
        profileImage: formData.profileImage
      });
      
      updateUserData(updatedUser);
      setEditMode(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully');
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({
        ...prev,
        imagePreview: reader.result
      }));
    };
    reader.readAsDataURL(file);
    
    // In a real app, you would upload the image to your server here
    // For now, we'll simulate an upload
    setUploadingImage(true);
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        profileImage: reader.result // Use the data URL for the profile image
      }));
      setUploadingImage(false);
      toast.success('Profile image updated!');
    }, 1500);
  };
  
  const handleSubmitTestimonial = async () => {
    if (!testimonialText.trim()) {
      toast.error('Please enter your review');
      return;
    }
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    setSubmittingTestimonial(true);
    
    try {
      const response = await api.post('/api/testimonials', {
        review: testimonialText,
        rating,
        // Include the profile image if available
        image: formData.profileImage
      });
      
      if (response.data && response.data.success) {
        toast.success('Testimonial submitted successfully! It will be reviewed by our team.');
        setTestimonialText('');
        setRating(0);
        
        // Refresh testimonials list
        fetchUserTestimonials();
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      toast.error(error.response?.data?.message || 'Failed to submit testimonial');
    } finally {
      setSubmittingTestimonial(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-2xl p-6 sm:p-10 text-white">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="relative mb-6 sm:mb-0 sm:mr-8">
              <div className="w-32 h-32 rounded-full bg-white/20 overflow-hidden relative">
                {formData.imagePreview ? (
                  <img 
                    src={formData.imagePreview} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <FaUser className="text-gray-400 text-4xl" />
                  </div>
                )}
                
                {uploadingImage && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <FaSpinner className="text-white text-2xl animate-spin" />
                  </div>
                )}
                
                <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 p-2 rounded-full cursor-pointer">
                  <FaCamera className="text-white" />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={uploadingImage}
                  />
                </label>
              </div>
            </div>
            
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold">{currentUser?.name || 'User'}</h1>
              <p className="text-blue-100 mt-1 flex items-center justify-center sm:justify-start">
                <FaEnvelope className="mr-2" /> {currentUser?.email || 'email@example.com'}
              </p>
              <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeTab === 'profile' 
                      ? 'bg-white text-blue-600' 
                      : 'bg-blue-700/50 text-white hover:bg-blue-700/70'
                  }`}
                >
                  <FaUser className="inline mr-1" /> Profile
                </button>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeTab === 'orders' 
                      ? 'bg-white text-blue-600' 
                      : 'bg-blue-700/50 text-white hover:bg-blue-700/70'
                  }`}
                >
                  <FaShoppingBag className="inline mr-1" /> Orders
                </button>
                <button 
                  onClick={() => setActiveTab('testimonials')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeTab === 'testimonials' 
                      ? 'bg-white text-blue-600' 
                      : 'bg-blue-700/50 text-white hover:bg-blue-700/70'
                  }`}
                >
                  <FaStar className="inline mr-1" /> Testimonials
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-red-500/70 text-white hover:bg-red-500"
                >
                  <FaSignOutAlt className="inline mr-1" /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="bg-white rounded-b-2xl shadow-sm">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                {!editMode ? (
                  <button 
                    onClick={() => setEditMode(true)}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit className="mr-1" /> Edit Profile
                  </button>
                ) : (
                  <button 
                    onClick={() => setEditMode(false)}
                    className="flex items-center text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                )}
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center">
                  <FaExclamationTriangle className="mr-2" /> {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className={`relative rounded-md shadow-sm ${editMode ? '' : 'bg-gray-50'}`}>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!editMode}
                        className={`block w-full pl-10 pr-3 py-2 rounded-md ${
                          editMode 
                            ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500' 
                            : 'border-transparent text-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className={`relative rounded-md shadow-sm ${editMode ? '' : 'bg-gray-50'}`}>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!editMode}
                        className={`block w-full pl-10 pr-3 py-2 rounded-md ${
                          editMode 
                            ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500' 
                            : 'border-transparent text-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className={`relative rounded-md shadow-sm ${editMode ? '' : 'bg-gray-50'}`}>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!editMode}
                        className={`block w-full pl-10 pr-3 py-2 rounded-md ${
                          editMode 
                            ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500' 
                            : 'border-transparent text-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <div className={`relative rounded-md shadow-sm ${editMode ? '' : 'bg-gray-50'}`}>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaMapMarkerAlt className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={!editMode}
                        className={`block w-full pl-10 pr-3 py-2 rounded-md ${
                          editMode 
                            ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500' 
                            : 'border-transparent text-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>
                
                {editMode && (
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                    >
                      {loading ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <FaSave className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
              
              <div className="mt-10 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/change-password" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <FaShieldAlt className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Change Password</h4>
                      <p className="text-sm text-gray-500">Update your password for better security</p>
                    </div>
                  </Link>
                  
                  <Link to="/privacy-settings" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <FaBell className="text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Notification Settings</h4>
                      <p className="text-sm text-gray-500">Manage your email and app notifications</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
          
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Orders</h2>
              
              {loadingOrders ? (
                <div className="flex justify-center py-10">
                  <FaSpinner className="animate-spin text-3xl text-blue-600" />
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order._id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-4 flex flex-wrap justify-between items-center">
                        <div>
                          <span className="text-sm text-gray-500">Order ID:</span>
                          <span className="ml-2 font-medium">{order._id.substring(0, 8)}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Date:</span>
                          <span className="ml-2 font-medium">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Total:</span>
                          <span className="ml-2 font-medium">${order.totalAmount.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h4 className="font-medium mb-2">Items</h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                                  <FaUtensils className="text-gray-500" />
                                </div>
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 p-4 flex justify-between">
                        <Link 
                          to={`/orders/${order._id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        >
                          View Details
                        </Link>
                        
                        {order.status === 'delivered' && !order.hasReview && (
                          <button 
                            onClick={() => {
                              setActiveTab('testimonials');
                              setTestimonialText(`I recently ordered from Meal Lovers and wanted to share my experience with order #${order._id.substring(0, 8)}.`);
                            }}
                            className="text-green-600 hover:text-green-800 font-medium flex items-center"
                          >
                            <FaStar className="mr-1" /> Leave Review
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <FaShoppingBag className="mx-auto text-4xl text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-800 mb-1">No orders yet</h3>
                  <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                  <Link 
                    to="/menu" 
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <FaUtensils className="mr-2" /> Browse Menu
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Testimonials</h2>
              
              {/* Write a testimonial */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Share Your Experience</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={testimonialText}
                    onChange={(e) => setTestimonialText(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Share your experience with our food and service..."
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-2xl focus:outline-none"
                      >
                        {star <= (hoverRating || rating) ? (
                          <span className="text-yellow-400">★</span>
                        ) : (
                          <span className="text-gray-300">★</span>
                        )}
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="ml-2 text-sm text-gray-600 self-center">
                        {rating === 1 ? 'Poor' : 
                         rating === 2 ? 'Fair' : 
                         rating === 3 ? 'Good' : 
                         rating === 4 ? 'Very Good' : 'Excellent'}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={handleSubmitTestimonial}
                    disabled={submittingTestimonial}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                  >
                    {submittingTestimonial ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FaComment className="mr-2" />
                        Submit Testimonial
                      </>
                    )}
                  </button>
                  
                  <p className="ml-4 text-sm text-gray-500">
                    Your testimonial may be featured on our website after review.
                  </p>
                </div>
              </div>
              
              {/* Previous testimonials */}
              <h3 className="text-lg font-medium text-gray-800 mb-4">Your Previous Testimonials</h3>
              
              {userTestimonials.length > 0 ? (
                <div className="space-y-4">
                  {userTestimonials.map(testimonial => (
                    <div key={testimonial._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map(star => (
                              <span key={star} className={star <= testimonial.rating ? "text-yellow-400" : "text-gray-300"}>
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-500">
                            {new Date(testimonial.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          testimonial.isApproved 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {testimonial.isApproved ? 'Published' : 'Pending Review'}
                        </span>
                      </div>
                      <p className="text-gray-700">{testimonial.review}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <FaStar className="mx-auto text-4xl text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-800 mb-1">No testimonials yet</h3>
                  <p className="text-gray-500">Share your experience with us above!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;