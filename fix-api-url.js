import fs from 'fs';
import path from 'path';

// Function to fix the API URL issue
function fixApiUrl() {
  try {
    console.log('Fixing API URL issue...');
    
    // Check config.js file
    const configPath = path.join('frontend', 'src', 'config.js');
    if (fs.existsSync(configPath)) {
      let configContent = fs.readFileSync(configPath, 'utf8');
      
      // Check if API_URL has double /api
      if (configContent.includes('localhost:5000/api')) {
        configContent = configContent.replace(
          /export const API_URL = ['"]http:\/\/localhost:5000\/api['"]/,
          'export const API_URL = \'http://localhost:5000\''
        );
        
        fs.writeFileSync(configPath, configContent);
        console.log('Fixed API_URL in config.js');
      }
    }
    
    // Check .env file
    const envPath = path.join('frontend', '.env');
    if (fs.existsSync(envPath)) {
      let envContent = fs.readFileSync(envPath, 'utf8');
      
      // Check if REACT_APP_API_URL has double /api
      if (envContent.includes('REACT_APP_API_URL=') && envContent.includes('/api')) {
        envContent = envContent.replace(
          /REACT_APP_API_URL=.*?localhost:5000\/api/,
          'REACT_APP_API_URL=http://localhost:5000'
        );
        
        fs.writeFileSync(envPath, envContent);
        console.log('Fixed REACT_APP_API_URL in .env');
      }
    }
    
    // Check authService.js
    const authServicePath = path.join('frontend', 'src', 'services', 'authService.js');
    if (fs.existsSync(authServicePath)) {
      let authServiceContent = fs.readFileSync(authServicePath, 'utf8');
      
      // Check if there are hardcoded API paths with /api
      if (authServiceContent.includes('/api/auth/')) {
        // Make sure we're not creating double slashes
        authServiceContent = authServiceContent.replace(
          /api\.post\(['"]\/api\/auth\//g,
          'api.post(\'/api/auth/'
        );
        
        fs.writeFileSync(authServicePath, authServiceContent);
        console.log('Fixed API paths in authService.js');
      }
    }
    
    console.log('API URL fix completed!');
    console.log('Please restart your frontend application for changes to take effect.');
  } catch (error) {
    console.error('Error fixing API URL:', error.message);
  }
}

fixApiUrl(); 