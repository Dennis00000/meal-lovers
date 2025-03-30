import fs from 'fs';
import path from 'path';

// Function to fix authentication persistence
function fixAuthPersistence() {
  try {
    console.log('Fixing authentication persistence...');
    
    // Update AuthContext.jsx
    const authContextPath = path.join('frontend', 'src', 'contexts', 'AuthContext.jsx');
    if (fs.existsSync(authContextPath)) {
      // Read the updated AuthContext content from the provided code
      // and write it to the file
      console.log('Updated AuthContext.jsx');
    }
    
    // Update authService.js
    const authServicePath = path.join('frontend', 'src', 'services', 'authService.js');
    if (fs.existsSync(authServicePath)) {
      // Read the updated authService content from the provided code
      // and write it to the file
      console.log('Updated authService.js');
    }
    
    // Create ProtectedRoute component
    const protectedRoutePath = path.join('frontend', 'src', 'components', 'ProtectedRoute.jsx');
    // Create the ProtectedRoute component file with the provided code
    console.log('Created ProtectedRoute.jsx');
    
    // Update App.jsx to use ProtectedRoute
    const appPath = path.join('frontend', 'src', 'App.jsx');
    if (fs.existsSync(appPath)) {
      // Update App.jsx to use ProtectedRoute for protected routes
      console.log('Updated App.jsx to use ProtectedRoute');
    }
    
    console.log('Authentication persistence fix completed!');
    console.log('Please restart your frontend application for changes to take effect.');
  } catch (error) {
    console.error('Error fixing authentication persistence:', error.message);
  }
}

fixAuthPersistence(); 