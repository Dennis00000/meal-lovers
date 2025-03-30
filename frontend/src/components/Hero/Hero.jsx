import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-left">
        <h1>
          Delicious <span className="text-primary">Meals</span>
          <br />
          Delivered to Your Door
        </h1>
        <p>
          Enjoy restaurant-quality dishes made with fresh ingredients, 
          delivered straight to your home in minutes. From family favorites 
          to gourmet specialties, we've got your cravings covered!
        </p>
        <button className="order-button">
          Order Now
        </button>
      </div>

      <div className="hero-right">
        <motion.div 
          className="food-bowl-container"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="/food-bowl.png" 
            alt="Food Bowl"
            className="main-bowl"
          />
          <div className="floating-items">
            <img src="/burger.png" alt="Burger" className="float-item burger" />
            <img src="/cookies.png" alt="Cookies" className="float-item cookies" />
            <img src="/salad.png" alt="Salad" className="float-item salad" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero; 