import fs from 'fs';
import path from 'path';

// Function to create the profile page
function createProfilePage() {
  try {
    console.log('Creating profile page...');
    
    // Create the ProfilePage component
    const profilePagePath = path.join('frontend', 'src', 'pages', 'ProfilePage.jsx');
    const profilePageContent = `import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from '../services/authService';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        street: currentUser.address?.street || '',
        city: currentUser.address?.city || '',
        state: currentUser.address?.state || '',
        zipCode: currentUser.address?.zipCode || '',
        country: currentUser.address?.country || ''
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare data for API
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        }
      };

      const response = await updateProfile(userData);
      
      if (response.success) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">User not logged in</h2>
          <p className="mb-4">Please log in to view your profile</p>
          <a href="/login" className="text-blue-600 hover:underline">Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Account Information</h2>
          <p><span className="font-medium">Name:</span> {currentUser.name}</p>
          <p><span className="font-medium">Email:</span> {currentUser.email}</p>
          <p><span className="font-medium">Role:</span> {currentUser.role}</p>
          <p><span className="font-medium">Member Since:</span> {new Date(currentUser.createdAt).toLocaleDateString()}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4">Update Profile</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="phone">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <h3 className="text-md font-semibold mb-3 mt-6">Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="street">
                Street Address
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="city">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="state">
                State/Province
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="zipCode">
                ZIP/Postal Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="country">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;`;

    // Create the directory if it doesn't exist
    const pagesDir = path.join('frontend', 'src', 'pages');
    if (!fs.existsSync(pagesDir)) {
      fs.mkdirSync(pagesDir, { recursive: true });
    }

    // Write the ProfilePage component
    fs.writeFileSync(profilePagePath, profilePageContent);
    console.log('Created ProfilePage component');

    // Update the LoginForm to redirect to profile page
    const loginFormPath = path.join('frontend', 'src', 'components', 'Auth', 'LoginForm.jsx');
    if (fs.existsSync(loginFormPath)) {
      let loginFormContent = fs.readFileSync(loginFormPath, 'utf8');
      
      // Add useLocation import
      if (!loginFormContent.includes('useLocation')) {
        loginFormContent = loginFormContent.replace(
          /import { useNavigate, Link } from 'react-router-dom';/,
          `import { useNavigate, Link, useLocation } from 'react-router-dom';`
        );
      }
      
      // Add location hook
      if (!loginFormContent.includes('const location = useLocation()')) {
        loginFormContent = loginFormContent.replace(
          /const navigate = useNavigate\(\);/,
          `const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state or default to profile
  const from = location.state?.from?.pathname || '/profile';`
        );
      }
      
      // Update navigation after successful login
      loginFormContent = loginFormContent.replace(
        /navigate\('\/'\);/,
        `navigate(from, { replace: true });`
      );
      
      fs.writeFileSync(loginFormPath, loginFormContent);
      console.log('Updated LoginForm component');
    }
    
    // Update App.jsx to include the profile route
    const appPath = path.join('frontend', 'src', 'App.jsx');
    if (fs.existsSync(appPath)) {
      let appContent = fs.readFileSync(appPath, 'utf8');
      
      // Add ProfilePage import if it doesn't exist
      if (!appContent.includes('import ProfilePage')) {
        const importStatement = appContent.includes('import OrdersPage')
          ? appContent.replace(
              /import OrdersPage from '\.\/pages\/OrdersPage';/,
              `import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';`
            )
          : appContent.replace(
              /import RegisterPage from '\.\/pages\/RegisterPage';/,
              `import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';`
            );
        
        appContent = importStatement;
      }
      
      // Add profile route if it doesn't exist
      if (!appContent.includes('path="/profile"')) {
        appContent = appContent.replace(
          /<Route path="\/register" element={<RegisterPage \/>} \/>/,
          `<Route path="/register" element={<RegisterPage />} />
              
              {/* Protected routes */}
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />`
        );
      }
      
      // Add dashboard redirect if it doesn't exist
      if (!appContent.includes('path="/dashboard"')) {
        appContent = appContent.replace(
          /<\/Routes>/,
          `              
              {/* Redirect to profile after successful login */}
              <Route path="/dashboard" element={<Navigate to="/profile" replace />} />
              
              {/* 404 page */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>`
        );
      }
      
      fs.writeFileSync(appPath, appContent);
      console.log('Updated App.jsx');
    }
    
    console.log('Profile page creation completed!');
    console.log('Please restart your frontend application for changes to take effect.');
  } catch (error) {
    console.error('Error creating profile page:', error.message);
  }
}

createProfilePage(); 