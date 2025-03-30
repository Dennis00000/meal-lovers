import { execSync } from 'child_process';

try {
  console.log('Installing required dependencies for admin panel...');
  
  execSync('npm install @radix-ui/react-select @radix-ui/react-switch @radix-ui/react-tabs lucide-react', {
    cwd: './admin',
    stdio: 'inherit'
  });
  
  console.log('Dependencies installed successfully!');
} catch (error) {
  console.error('Error installing dependencies:', error.message);
} 