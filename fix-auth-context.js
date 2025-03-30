import fs from 'fs';
import path from 'path';

// Function to fix the AuthContext issue
function fixAuthContext() {
  try {
    console.log('Fixing AuthContext issue...');
    
    const authContextPath = path.join('frontend', 'src', 'contexts', 'AuthContext.jsx');
    if (fs.existsSync(authContextPath)) {
      let authContextContent = fs.readFileSync(authContextPath, 'utf8');
      
      // Update the imports to match the renamed functions in authService.js
      if (authContextContent.includes('import { loginUser,')) {
        authContextContent = authContextContent.replace(
          /import {(\s*)loginUser,(\s*)logoutUser,(\s*)registerUser,(\s*)(.*?)(\s*)} from '..\/services\/authService';/,
          `import { 
  login as loginUser, 
  logout as logoutUser, 
  register as registerUser, 
  getCurrentUser, 
  isAuthenticated 
} from '../services/authService';`
        );
        
        fs.writeFileSync(authContextPath, authContextContent);
        console.log('Updated imports in AuthContext.jsx');
      } else {
        console.log('AuthContext.jsx already has correct imports');
      }
    } else {
      console.log('AuthContext.jsx not found');
    }
    
    console.log('AuthContext issue fixed successfully!');
  } catch (error) {
    console.error('Error fixing AuthContext issue:', error.message);
  }
}

fixAuthContext(); 