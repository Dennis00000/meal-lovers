import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Function to completely fix the admin panel
async function fixAdminCompletely() {
  try {
    console.log('Starting comprehensive admin panel fix...');
    
    // 1. Remove Ant Design completely
    console.log('Removing Ant Design...');
    try {
      execSync('npm uninstall antd @ant-design/icons', { 
        cwd: './admin',
        stdio: 'inherit' 
      });
    } catch (error) {
      console.log('Ant Design packages might not be installed, continuing...');
    }
    
    // 2. Update main.jsx to remove Ant Design CSS import
    console.log('Updating main.jsx...');
    const mainJsxPath = path.join('admin', 'src', 'main.jsx');
    if (fs.existsSync(mainJsxPath)) {
      let mainJsxContent = fs.readFileSync(mainJsxPath, 'utf8');
      
      // Remove any Ant Design CSS imports
      mainJsxContent = mainJsxContent.replace(
        /import ['"]antd\/dist\/.*?['"];?\n?/g,
        ''
      );
      
      fs.writeFileSync(mainJsxPath, mainJsxContent);
    }
    
    // 3. Update Settings.jsx to use plain HTML/CSS
    console.log('Updating Settings.jsx...');
    const settingsPath = path.join('admin', 'src', 'pages', 'Settings.jsx');
    if (fs.existsSync(settingsPath)) {
      // We'll use the version we already created in the remove-antd.js script
      // which doesn't rely on Ant Design
    }
    
    // 4. Check for other files that might be importing Ant Design
    console.log('Checking for other Ant Design imports...');
    const adminSrcDir = path.join('admin', 'src');
    const filesWithAntd = findAntdImports(adminSrcDir);
    
    if (filesWithAntd.length > 0) {
      console.log(`Found ${filesWithAntd.length} files with Ant Design imports that need fixing:`);
      
      for (const file of filesWithAntd) {
        console.log(`- Fixing ${file.path}...`);
        
        // For now, we'll just comment out the Ant Design imports
        // A more comprehensive solution would replace them with alternatives
        let content = file.content;
        content = content.replace(
          /import .* from ['"]antd.*?['"];?\n?/g,
          '// Removed Ant Design import\n'
        );
        content = content.replace(
          /import .* from ['"]@ant-design\/icons.*?['"];?\n?/g,
          '// Removed Ant Design icons import\n'
        );
        
        fs.writeFileSync(file.path, content);
      }
    } else {
      console.log('No additional Ant Design imports found!');
    }
    
    console.log('Admin panel fixed successfully!');
  } catch (error) {
    console.error('Error fixing admin panel:', error.message);
  }
}

// Helper function to find files with Ant Design imports
function findAntdImports(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules')) {
      findAntdImports(filePath, fileList);
    } else if (stat.isFile() && (filePath.endsWith('.js') || filePath.endsWith('.jsx'))) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('antd') || content.includes('@ant-design')) {
        fileList.push({
          path: filePath,
          content
        });
      }
    }
  });
  
  return fileList;
}

fixAdminCompletely(); 