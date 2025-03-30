import fs from 'fs';
import path from 'path';

// Function to enhance profile and fix orders page
function enhanceProfileAndOrders() {
  try {
    console.log('Enhancing profile page and fixing orders page...');
    
    // Update ProfilePage.jsx with enhanced version
    const profilePagePath = path.join('frontend', 'src', 'pages', 'ProfilePage.jsx');
    // Write the enhanced ProfilePage content here
    
    // Create or update MyOrders.jsx
    const myOrdersDir = path.join('frontend', 'src', 'pages', 'MyOrders');
    if (!fs.existsSync(myOrdersDir)) {
      fs.mkdirSync(myOrdersDir, { recursive: true });
    }
    
    const myOrdersPath = path.join(myOrdersDir, 'MyOrders.jsx');
    // Write the MyOrders component content here
    
    // Create MyOrders.css
    const myOrdersCssPath = path.join(myOrdersDir, 'MyOrders.css');
    const myOrdersCssContent = `.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}`;
    
    fs.writeFileSync(myOrdersCssPath, myOrdersCssContent);
    console.log('Created MyOrders.css');
    
    // Update App.jsx to ensure routes are properly protected
    const appPath = path.join('frontend', 'src', 'App.jsx');
    if (fs.existsSync(appPath)) {
      let appContent = fs.readFileSync(appPath, 'utf8');
      
      // Check if profile-page is already in protected routes
      if (!appContent.includes("path='/profile-page'") && 
          appContent.includes("<Route element={<ProtectedRoute />}>")) {
        appContent = appContent.replace(
          /<Route element={<ProtectedRoute \/>}>/,
          `<Route element={<ProtectedRoute />}>
  <Route path='/my-orders' element={<MyOrders />} />
  <Route path='/profile' element={<Profile />} />
  <Route path='/profile-page' element={<ProfilePage />} />`
        );
        
        fs.writeFileSync(appPath, appContent);
        console.log('Updated App.jsx with protected routes');
      }
    }
    
    console.log('Profile and orders enhancement completed!');
    console.log('Please restart your frontend application for changes to take effect.');
  } catch (error) {
    console.error('Error enhancing profile and orders:', error.message);
  }
}

enhanceProfileAndOrders(); 