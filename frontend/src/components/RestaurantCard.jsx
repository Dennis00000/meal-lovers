import React from 'react';
import Image from './common/Image';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="restaurant-card">
      <Image 
        src={restaurant.logo} 
        alt={restaurant.name}
        className="restaurant-logo"
        style={{ borderRadius: '50%', aspectRatio: '1/1' }}
        fallbackSrc="/images/default-restaurant.jpg"
      />
      {/* Rest of the component */}
    </div>
  );
};

export default RestaurantCard; 