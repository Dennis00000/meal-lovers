import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Function to install dependencies
function installDependencies() {
  try {
    console.log('Installing missing dependencies...');
    
    // Install antd and related packages
    execSync('npm install antd @ant-design/icons', { 
      cwd: './admin',
      stdio: 'inherit' 
    });
    
    console.log('Dependencies installed successfully!');
  } catch (error) {
    console.error('Error installing dependencies:', error.message);
  }
}

installDependencies(); 