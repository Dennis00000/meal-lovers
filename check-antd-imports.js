import fs from 'fs';
import path from 'path';

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

try {
  console.log('Checking for Ant Design imports...');
  const adminDir = path.join('admin', 'src');
  const filesWithAntd = findAntdImports(adminDir);
  
  if (filesWithAntd.length > 0) {
    console.log(`Found ${filesWithAntd.length} files with Ant Design imports:`);
    filesWithAntd.forEach(file => {
      console.log(`- ${file.path}`);
    });
  } else {
    console.log('No Ant Design imports found!');
  }
} catch (error) {
  console.error('Error checking for Ant Design imports:', error.message);
} 