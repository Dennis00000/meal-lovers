import fs from 'fs';
import path from 'path';

// Function to fix circular reference issues
function fixCircularReference() {
  try {
    console.log('Fixing circular reference issues...');
    
    // Fix ProfilePage.jsx
    const profilePagePath = path.join('frontend', 'src', 'pages', 'ProfilePage.jsx');
    if (fs.existsSync(profilePagePath)) {
      let profilePageContent = fs.readFileSync(profilePagePath, 'utf8');
      
      // Update the import statement
      profilePageContent = profilePageContent.replace(
        /import \{ useAuth \} from '\.\.\/contexts\/AuthContext';/,
        `import { useAuth } from '../contexts/AuthContext';
import { updateProfile, checkApiConnection as checkApiStatus } from '../services/authService';`
      );
      
      // Update the function call
      profilePageContent = profilePageContent.replace(
        /const checkApiConnection = async \(\) => {/,
        `const checkConnection = async () => {`
      );
      
      profilePageContent = profilePageContent.replace(
        /const result = await checkApiConnection\(\);/,
        `const result = await checkApiStatus();`
      );
      
      profilePageContent = profilePageContent.replace(
        /checkApiConnection\(\);/,
        `checkConnection();`
      );
      
      fs.writeFileSync(profilePagePath, profilePageContent);
      console.log('Updated ProfilePage.jsx');
    }
    
    // Fix DebugPanel.jsx
    const debugPanelPath = path.join('frontend', 'src', 'components', 'DebugPanel.jsx');
    if (fs.existsSync(debugPanelPath)) {
      let debugPanelContent = fs.readFileSync(debugPanelPath, 'utf8');
      
      // Update the import statement
      debugPanelContent = debugPanelContent.replace(
        /import \{ checkApiConnection \} from '\.\.\/services\/authService';/,
        `import { checkApiConnection as checkApiStatus } from '../services/authService';`
      );
      
      // Update the function call
      debugPanelContent = debugPanelContent.replace(
        /const result = await checkApiConnection\(\);/,
        `const result = await checkApiStatus();`
      );
      
      fs.writeFileSync(debugPanelPath, debugPanelContent);
      console.log('Updated DebugPanel.jsx');
    }
    
    console.log('Circular reference fixes completed!');
    console.log('Please restart your frontend application for changes to take effect.');
  } catch (error) {
    console.error('Error fixing circular references:', error.message);
  }
}

fixCircularReference(); 