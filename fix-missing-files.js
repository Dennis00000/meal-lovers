import fs from 'fs';
import path from 'path';

// Function to fix missing files
function fixMissingFiles() {
  try {
    console.log('Fixing missing files...');
    
    // Create the pages directory if it doesn't exist
    const pagesDir = path.join('frontend', 'src', 'pages');
    if (!fs.existsSync(pagesDir)) {
      fs.mkdirSync(pagesDir, { recursive: true });
    }
    
    // Create NotFoundPage.jsx
    const notFoundPagePath = path.join(pagesDir, 'NotFoundPage.jsx');
    const notFoundPageContent = `import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
      <p className="text-gray-600 text-center max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/" 
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Go to Home
        </Link>
        <Link 
          to="/menu" 
          className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-300 transition duration-300"
        >
          Browse Menu
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;`;
    
    fs.writeFileSync(notFoundPagePath, notFoundPageContent);
    console.log('Created NotFoundPage.jsx');
    
    // Fix App.jsx
    const appPath = path.join('frontend', 'src', 'App.jsx');
    if (fs.existsSync(appPath)) {
      let appContent = fs.readFileSync(appPath, 'utf8');
      
      // Fix imports
      appContent = appContent.replace(
        /import OrdersPage from '\.\/pages\/OrdersPage'/g,
        "// We'll use the existing MyOrders page instead of creating a new OrdersPage"
      );
      
      appContent = appContent.replace(
        /import NotFoundPage from '\.\/pages\/NotFoundPage'/g,
        "import NotFoundPage from './pages/NotFoundPage'"
      );
      
      // Fix routes
      appContent = appContent.replace(
        /<Route path='\/orders' element={<OrdersPage \/>} \/>/g,
        "<!-- Using existing MyOrders page instead -->"
      );
      
      // Fix the profile route to use the new ProfilePage
      if (appContent.includes("<Route path='/profile' element={<Profile />} />")) {
        appContent = appContent.replace(
          /<Route path='\/profile' element={<Profile \/>} \/>/g,
          "<Route path='/profile' element={<ProfilePage />} />"
        );
      } else if (!appContent.includes("<Route path='/profile-page' element={<ProfilePage />} />")) {
        // Add ProfilePage route if it doesn't exist
        appContent = appContent.replace(
          /<Route path='\/order-confirmation\/:id' element={<OrderConfirmation \/>} \/>/g,
          "<Route path='/order-confirmation/:id' element={<OrderConfirmation />} />\n                <Route path='/profile-page' element={<ProfilePage />} />"
        );
      }
      
      fs.writeFileSync(appPath, appContent);
      console.log('Fixed App.jsx');
    }
    
    console.log('Missing files fix completed!');
    console.log('Please restart your frontend application for changes to take effect.');
  } catch (error) {
    console.error('Error fixing missing files:', error.message);
  }
}

fixMissingFiles(); 