import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Function to fix the admin panel
function fixAdminPanel() {
  try {
    console.log('Fixing admin panel...');
    
    // Install antd and related packages
    execSync('npm install antd@5.x @ant-design/icons --save', { 
      cwd: './admin',
      stdio: 'inherit' 
    });
    
    // Update main.jsx to import antd CSS
    const mainJsxPath = path.join('admin', 'src', 'main.jsx');
    if (fs.existsSync(mainJsxPath)) {
      let mainJsxContent = fs.readFileSync(mainJsxPath, 'utf8');
      
      if (!mainJsxContent.includes('antd/dist/reset.css')) {
        mainJsxContent = mainJsxContent.replace(
          "import './index.css'",
          "import './index.css'\nimport 'antd/dist/reset.css' // Import Ant Design styles"
        );
        
        fs.writeFileSync(mainJsxPath, mainJsxContent);
        console.log('Updated main.jsx to import Ant Design styles');
      }
    }
    
    console.log('Admin panel fixed successfully!');
  } catch (error) {
    console.error('Error fixing admin panel:', error.message);
  }
}

fixAdminPanel(); 