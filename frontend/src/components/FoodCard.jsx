import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from './common/Image';
// Other imports...

const FoodCard = ({ food }) => {
  // Component logic...
  
  return (
    <div className="food-card">
      <Image 
        src={food.image} 
        alt={food.name}
        className="food-image"
        fallbackSrc="/images/default-food.jpg"
      />
      {/* Rest of the component */}
    </div>
  );
}; 