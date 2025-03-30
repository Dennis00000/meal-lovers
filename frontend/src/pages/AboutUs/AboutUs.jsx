import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaTruck, FaUsers, FaHeart, FaUtensils, FaClock, FaArrowRight } from 'react-icons/fa';
import './AboutUs.css';

// Use high-quality placeholder images
const placeholderImages = {
  restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=90&auto=format&fit=crop',
  chef: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=90&auto=format&fit=crop',
  team: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=1200&q=90&auto=format&fit=crop',
  kitchen: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=90&auto=format&fit=crop',
  ingredients: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=90&auto=format&fit=crop',
  dining: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=90&auto=format&fit=crop'
};

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Head Chef',
      image: '/images/team/chef.jpg',
      bio: 'With over 15 years of culinary experience, Alex brings creativity and passion to every dish.'
    },
    {
      name: 'Sarah Williams',
      role: 'Nutritionist',
      image: '/images/team/nutritionist.jpg',
      bio: 'Sarah ensures all our meals are not only delicious but also nutritionally balanced.'
    },
    {
      name: 'Michael Chen',
      role: 'Delivery Manager',
      image: '/images/team/manager.jpg',
      bio: 'Michael oversees our delivery operations to ensure your food arrives fresh and on time.'
    }
  ];

  const values = [
    {
      icon: <FaLeaf />,
      title: 'Fresh Ingredients',
      description: 'We source only the freshest, highest quality ingredients from local suppliers.'
    },
    {
      icon: <FaTruck />,
      title: 'Fast Delivery',
      description: 'Our efficient delivery system ensures your food arrives hot and fresh.'
    },
    {
      icon: <FaHeart />,
      title: 'Made with Love',
      description: 'Every dish is prepared with care, attention to detail, and a passion for great food.'
    },
    {
      icon: <FaUsers />,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority. We value your feedback and continuously improve.'
    },
    {
      icon: <FaUtensils />,
      title: 'Culinary Excellence',
      description: 'Our chefs are trained in various cuisines to bring you the best flavors from around the world.'
    },
    {
      icon: <FaClock />,
      title: 'Timely Service',
      description: 'We respect your time and strive to provide prompt service without compromising quality.'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero" style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${placeholderImages.restaurant})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <motion.div 
          className="about-hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Our Story</h1>
          <p>Passionate about food, dedicated to quality</p>
          <motion.a 
            href="#mission" 
            className="hero-scroll-btn"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.a>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="about-mission">
        <div className="mission-container">
          <motion.div 
            className="mission-image"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src={placeholderImages.restaurant} alt="Our restaurant" loading="lazy" />
          </motion.div>
          <motion.div 
            className="mission-content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Who We Are</h2>
            <p>Founded in 2010, Meal Lovers began with a simple idea: to create a place where food enthusiasts could enjoy exceptional meals made with fresh, locally-sourced ingredients.</p>
            <p>Over the years, we've grown from a small family-owned restaurant to a beloved culinary destination, but our commitment to quality and passion for food remains unchanged.</p>
            <motion.a 
              href="/menu" 
              className="mission-link"
              whileHover={{ x: 5 }}
            >
              Explore our menu <FaArrowRight />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Values Section - Updated to 3x3 grid */}
      <section className="about-values">
        <div className="container">
          <h2>Our Values</h2>
          <p className="section-subtitle">What drives us every day</p>
          
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">
                <FaLeaf />
              </div>
              <h3>Fresh Ingredients</h3>
              <p>We source only the freshest, highest quality ingredients from local suppliers.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <FaTruck />
              </div>
              <h3>Fast Delivery</h3>
              <p>Our efficient delivery system ensures your food arrives hot and fresh.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <FaHeart />
              </div>
              <h3>Made with Love</h3>
              <p>Every dish is prepared with care, attention to detail, and a passion for great food.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <FaUsers />
              </div>
              <h3>Customer First</h3>
              <p>Your satisfaction is our top priority. We value your feedback and continuously improve.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <FaUtensils />
              </div>
              <h3>Culinary Excellence</h3>
              <p>Our chefs are trained in various cuisines to bring you the best flavors from around the world.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <FaClock />
              </div>
              <h3>Timely Service</h3>
              <p>We respect your time and strive to provide prompt service without compromising quality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Meet Our Team
        </motion.h2>
        <div className="team-grid">
          <motion.div 
            className="team-image-container"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.03 }}
          >
            <img src={placeholderImages.chef} alt="Our chef" className="team-image" loading="lazy" />
            <div className="team-overlay">
              <h3>Our Talented Chefs</h3>
              <p>Led by Executive Chef Michael Romano, our culinary team brings decades of experience and passion to every dish.</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="team-image-container"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <img src={placeholderImages.kitchen} alt="Our kitchen" className="team-image" loading="lazy" />
            <div className="team-overlay">
              <h3>State-of-the-Art Kitchen</h3>
              <p>Our modern kitchen is equipped with the latest technology to ensure efficiency and consistency.</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="team-image-container"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
          >
            <img src={placeholderImages.team} alt="Our staff" className="team-image" loading="lazy" />
            <div className="team-overlay">
              <h3>Friendly Staff</h3>
              <p>Our service team is dedicated to providing a warm, welcoming experience for every guest.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="about-cta">
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Come Dine With Us</h2>
          <p>Experience the Meal Lovers difference for yourself. Whether you're joining us for a casual lunch, a special celebration, or ordering online, we look forward to serving you.</p>
          <div className="cta-buttons">
            <motion.a 
              href="/menu" 
              className="cta-button primary"
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(30, 60, 114, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Menu
            </motion.a>
            <motion.a 
              href="/contact" 
              className="cta-button secondary"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>
        <motion.div 
          className="cta-image"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img src={placeholderImages.dining} alt="Dining experience" loading="lazy" />
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs; 