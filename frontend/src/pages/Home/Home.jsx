import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaUtensils, FaTruck, FaClock, FaChevronDown } from 'react-icons/fa';
import './Home.css';
import TestimonialsSectionDemo from '../../components/TestimonialsSectionDemo';
import { GradientButton } from '@/components/ui/gradient-button';

const Home = () => {
  const features = [
    {
      icon: <FaUtensils />,
      title: "Fresh Ingredients",
      description: "We use only the freshest ingredients sourced from local suppliers."
    },
    {
      icon: <FaTruck />,
      title: "Fast Delivery",
      description: "Your food delivered to your doorstep in 30 minutes or less."
    },
    {
      icon: <FaClock />,
      title: "24/7 Service",
      description: "Order anytime, day or night. We're always open for you."
    }
  ];

  const featuredItems = [
    {
      id: 1,
      name: 'Classic Burger',
      description: 'Juicy beef patty with cheese, lettuce, tomato, and special sauce',
      price: 8.49,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'
    },
    {
      id: 2,
      name: 'Margherita Pizza',
      description: 'Traditional pizza with tomato sauce, mozzarella, and basil',
      price: 11.04,
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca'
    },
    {
      id: 3,
      name: 'Spaghetti Carbonara',
      description: 'Creamy pasta with pancetta, egg, parmesan, and black pepper',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3'
    },
    {
      id: 4,
      name: 'Chocolate Brownie',
      description: 'Rich chocolate brownie with vanilla ice cream',
      price: 5.94,
      image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      text: 'The food is absolutely delicious! I order from Meal Lovers at least twice a week.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
    {
      id: 2,
      name: 'Michael Chen',
      text: 'Fast delivery and the food is always hot. Their customer service is excellent too!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      text: 'I love the variety of options. Something for everyone in the family!',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
    }
  ];

  const categories = [
    {
      id: 1,
      name: 'Burgers',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add',
      count: 12
    },
    {
      id: 2,
      name: 'Pizza',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
      count: 8
    },
    {
      id: 3,
      name: 'Pasta',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141',
      count: 10
    },
    {
      id: 4,
      name: 'Salads',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      count: 6
    },
    {
      id: 5,
      name: 'Desserts',
      image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b',
      count: 9
    },
    {
      id: 6,
      name: 'Drinks',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd',
      count: 7
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section - Updated to match Rice Bowl design */}
      <section className="hero-section-modern">
        <div className="hero-container">
          <div className="hero-content-wrapper">
            <motion.div 
              className="hero-text"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="hero-title">Delicious <span className="text-gradient">Meals</span></h1>
              <h2 className="hero-subtitle">Delivered to Your Door</h2>
              <p className="hero-description">
                Enjoy restaurant-quality dishes made with fresh ingredients, delivered straight to your home in minutes. From family favorites to gourmet specialties, we've got your cravings covered!
              </p>
              <div className="hero-buttons">
                <Link to="/menu">
                  <GradientButton>Order Now</GradientButton>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="hero-image-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="hero-image-circle"></div>
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop" 
                alt="Rice Bowl" 
                className="hero-food-image"
              />
              <motion.img 
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&h=150&fit=crop&crop=face" 
                alt="Burger" 
                className="floating-ingredient ingredient-1"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.img 
                src="https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=150&h=150&fit=crop&crop=face" 
                alt="Pizza" 
                className="floating-ingredient ingredient-2"
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -8, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5
                }}
              />
              <motion.img 
                src="https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=150&h=150&fit=crop&crop=face" 
                alt="Dessert" 
                className="floating-ingredient ingredient-3"
                animate={{ 
                  y: [0, 12, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ 
                  duration: 4.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }}
              />
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="scroll-indicator" onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}>
          <FaChevronDown />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div 
              className="feature-card"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Items Section - Improved */}
      <section className="popular-section">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Popular Items</h2>
          <div className="popular-grid">
            {featuredItems.map((item) => (
              <div className="popular-card" key={item.id}>
                <div className="popular-image-container">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="popular-image"
                  />
                </div>
                <div className="popular-content">
                  <h3 className="popular-title">{item.name}</h3>
                  <p className="popular-description">{item.description}</p>
                  <div className="popular-footer">
                    <span className="popular-price">€{item.price.toFixed(2)}</span>
                    <Link to="/menu" className="popular-button">
                      Order Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="view-all-container">
            <Link to="/menu">
              <GradientButton className="flex items-center">
                View All Menu <FaArrowRight className="ml-2" />
              </GradientButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSectionDemo />
    </div>
  );
};

export default Home;
