import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Function to fix Ant Design issues
function fixAntDesignIssues() {
  try {
    console.log('Fixing Ant Design issues...');
    
    // Install the correct version of Ant Design
    execSync('npm install antd@4.24.15 @ant-design/icons@4.8.1 --save', { 
      cwd: './admin',
      stdio: 'inherit' 
    });
    
    // Update main.jsx to use the correct Ant Design CSS
    const mainJsxPath = path.join('admin', 'src', 'main.jsx');
    if (fs.existsSync(mainJsxPath)) {
      let mainJsxContent = fs.readFileSync(mainJsxPath, 'utf8');
      
      // Replace the reset.css import with the correct one for v4
      mainJsxContent = mainJsxContent.replace(
        "import 'antd/dist/reset.css'",
        "import 'antd/dist/antd.css'"
      );
      
      fs.writeFileSync(mainJsxPath, mainJsxContent);
      console.log('Updated main.jsx to use the correct Ant Design CSS');
    }
    
    console.log('Ant Design issues fixed successfully!');
  } catch (error) {
    console.error('Error fixing Ant Design issues:', error.message);
  }
}

fixAntDesignIssues(); 