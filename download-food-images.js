import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sample image URLs for each food category
const imageUrls = {
  'burger.jpg': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop',
  'pizza.jpg': 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&auto=format&fit=crop',
  'pasta.jpg': 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&auto=format&fit=crop',
  'salad.jpg': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
  'steak.jpg': 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&auto=format&fit=crop',
  'sushi.jpg': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop',
  'dessert.jpg': 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop',
  'drink.jpg': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop',
  'breakfast.jpg': 'https://images.unsplash.com/photo-1533089860892-a7c6f10a081a?w=800&auto=format&fit=crop'
};

// Create directory structure
const createDirectories = () => {
  const imagesDir = path.join('frontend', 'src', 'assets', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log('Created images directory');
  }
  
  const foodsDir = path.join(imagesDir, 'foods');
  if (!fs.existsSync(foodsDir)) {
    fs.mkdirSync(foodsDir, { recursive: true });
    console.log('Created foods directory');
  }
  
  return foodsDir;
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
    const foodsDir = createDirectories();
    
    // Download each image
    const downloads = Object.entries(imageUrls).map(([filename, url]) => {
      const destination = path.join(foodsDir, filename);
      return downloadImage(url, destination);
    });
    
    await Promise.all(downloads);
    
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error.message);
  }
};

downloadAllImages(); 