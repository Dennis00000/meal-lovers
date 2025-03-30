import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sample image URLs for About Us page
const imageUrls = {
  'restaurant.jpg': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop',
  'chef.jpg': 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&auto=format&fit=crop',
  'team.jpg': 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=1200&auto=format&fit=crop',
  'kitchen.jpg': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&auto=format&fit=crop',
  'ingredients.jpg': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop',
  'dining.jpg': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop'
};

// Create directory structure
const createDirectories = () => {
  const imagesDir = path.join('frontend', 'src', 'assets', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log('Created images directory');
  }
  
  const aboutDir = path.join(imagesDir, 'about');
  if (!fs.existsSync(aboutDir)) {
    fs.mkdirSync(aboutDir, { recursive: true });
    console.log('Created about directory');
  }
  
  return aboutDir;
};

// Download an image
const downloadImage = (url, destination) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${path.basename(destination)}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destination, () => {}); // Delete the file if there's an error
      reject(err);
    });
  });
};

// Main function to download all images
const downloadAllImages = async () => {
  try {
    const aboutDir = createDirectories();
    
    // Download each image
    const downloads = Object.entries(imageUrls).map(([filename, url]) => {
      const destination = path.join(aboutDir, filename);
      return downloadImage(url, destination);
    });
    
    await Promise.all(downloads);
    
    console.log('All About Us images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error.message);
  }
};

downloadAllImages(); 