import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Function to check if dependencies are installed
function checkDependencies() {
  try {
    console.log('Checking admin dependencies...');
    
    // Check if node_modules exists
    const nodeModulesPath = path.join('admin', 'node_modules');
    if (!fs.existsSync(nodeModulesPath)) {
      console.log('node_modules not found, installing dependencies...');
      execSync('npm install', { 
        cwd: './admin',
        stdio: 'inherit' 
      });
      return;
    }
    
    // Check for specific dependencies
    const dependencies = [
      '@radix-ui/react-select',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      'lucide-react',
      'antd',
      '@ant-design/icons'
    ];
    
    let missingDeps = [];
    
    for (const dep of dependencies) {
      const depPath = path.join('admin', 'node_modules', dep);
      if (!fs.existsSync(depPath)) {
        missingDeps.push(dep);
      }
    }
    
    if (missingDeps.length > 0) {
      console.log(`Missing dependencies: ${missingDeps.join(', ')}`);
      console.log('Installing missing dependencies...');
      
      execSync(`npm install ${missingDeps.join(' ')} --save`, { 
        cwd: './admin',
        stdio: 'inherit' 
      });
    } else {
      console.log('All dependencies are installed!');
    }
  } catch (error) {
    console.error('Error checking dependencies:', error.message);
  }
}

checkDependencies(); 