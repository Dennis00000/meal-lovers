import fs from 'fs';
import path from 'path';

// Function to create image directories
function createImageDirectories() {
  try {
    // Create the main images directory
    const imagesDir = path.join('frontend', 'src', 'assets', 'images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
      console.log('Created images directory');
    }
    
    // Create the foods subdirectory
    const foodsDir = path.join(imagesDir, 'foods');
    if (!fs.existsSync(foodsDir)) {
      fs.mkdirSync(foodsDir, { recursive: true });
      console.log('Created foods directory');
    }
    
    console.log('Directory structure created successfully!');
    console.log('Please add your food images to:', foodsDir);
    console.log('Required image names:');
    console.log('- burger.jpg');
    console.log('- pizza.jpg');
    console.log('- pasta.jpg');
    console.log('- salad.jpg');
    console.log('- steak.jpg');
    console.log('- sushi.jpg');
    console.log('- dessert.jpg');
    console.log('- drink.jpg');
    console.log('- breakfast.jpg');
    
  } catch (error) {
    console.error('Error creating directories:', error.message);
  }
}

createImageDirectories(); 