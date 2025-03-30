import fs from 'fs';
import path from 'path';

// Function to fix user navigation
function fixUserNavigation() {
  try {
    console.log('Fixing user navigation...');
    
    // Create UserDropdown component
    const componentsDir = path.join('frontend', 'src', 'components');
    if (!fs.existsSync(componentsDir)) {
      fs.mkdirSync(componentsDir, { recursive: true });
    }
    
    const userDropdownPath = path.join(componentsDir, 'UserDropdown.jsx');
    const userDropdownContent = `import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const UserDropdown = () => {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 focus:outline-none"
      >
        <span className="hidden md:inline">{currentUser?.name || 'User'}</span>
        <svg
          className={\`w-5 h-5 transition-transform \${isOpen ? 'transform rotate-180' : ''}\`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <Link
            to="/profile-page"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              Profile
            </div>
          </Link>
          
          <Link
            to="/my-orders"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
              My Orders
            </div>
          </Link>
          
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <div className="flex items-center text-red-600">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              Logout
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;`;
    
    fs.writeFileSync(userDropdownPath, userDropdownContent);
    console.log('Created UserDropdown component');
    
    // Update Navbar component
    const navbarPath = path.join('frontend', 'src', 'components', 'Navbar', 'Navbar.jsx');
    if (fs.existsSync(navbarPath)) {
      let navbarContent = fs.readFileSync(navbarPath, 'utf8');
      
      // Add import for UserDropdown
      if (!navbarContent.includes('import UserDropdown')) {
        navbarContent = navbarContent.replace(
          /import React from ['"]react['"];/,
          `import React from 'react';\nimport UserDropdown from '../UserDropdown';`
        );
      }
      
      // Update the user section in the Navbar
      // This is a bit tricky as the Navbar structure might vary, so we'll provide a general solution
      console.log('Please manually update your Navbar component to use the UserDropdown component');
      
      fs.writeFileSync(navbarPath, navbarContent);
      console.log('Updated Navbar component');
    }
    
    console.log('User navigation fix completed!');
    console.log('Please restart your frontend application for changes to take effect.');
  } catch (error) {
    console.error('Error fixing user navigation:', error.message);
  }
}

fixUserNavigation(); 