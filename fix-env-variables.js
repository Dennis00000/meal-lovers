import fs from 'fs';
import path from 'path';

// Function to fix environment variables
function fixEnvVariables() {
  try {
    console.log('Fixing environment variables...');
    
    // Update config.js
    const configPath = path.join('frontend', 'src', 'config.js');
    if (fs.existsSync(configPath)) {
      const configContent = `// In Vite, environment variables are accessed through import.meta.env, not process.env
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
`;
      fs.writeFileSync(configPath, configContent);
      console.log('Updated config.js');
    }
    
    // Create .env file if it doesn't exist
    const envPath = path.join('frontend', '.env');
    if (!fs.existsSync(envPath)) {
      const envContent = `VITE_API_URL=http://localhost:5000
`;
      fs.writeFileSync(envPath, envContent);
      console.log('Created .env file');
    }
    
    // Add debugging function to authService.js
    const authServicePath = path.join('frontend', 'src', 'services', 'authService.js');
    if (fs.existsSync(authServicePath)) {
      let authServiceContent = fs.readFileSync(authServicePath, 'utf8');
      
      if (!authServiceContent.includes('checkApiConnection')) {
        // Add the checkApiConnection function
        const functionToAdd = `
// Check API connectivity
export const checkApiConnection = async () => {
  try {
    console.log('Checking API connection to:', API_URL);
    const response = await axios.get(\`\${API_URL}/api/health-check\`);
    console.log('API connection response:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('API connection error:', error);
    return { 
      success: false, 
      error: error.response?.data?.message || error.message 
    };
  }
};
`;
        
        // Find the last export statement and add our function after it
        const lastExportIndex = authServiceContent.lastIndexOf('export const');
        if (lastExportIndex !== -1) {
          // Find the end of the last export function
          const lastExportEnd = authServiceContent.indexOf('};', lastExportIndex);
          if (lastExportEnd !== -1) {
            authServiceContent = 
              authServiceContent.substring(0, lastExportEnd + 2) + 
              functionToAdd + 
              authServiceContent.substring(lastExportEnd + 2);
            
            fs.writeFileSync(authServicePath, authServiceContent);
            console.log('Added checkApiConnection function to authService.js');
          }
        }
      }
    }
    
    console.log('Environment variables fix completed!');
    console.log('Please restart your frontend application for changes to take effect.');
  } catch (error) {
    console.error('Error fixing environment variables:', error.message);
  }
}

fixEnvVariables(); 