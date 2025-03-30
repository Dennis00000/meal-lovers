import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import api from '../services/api';
import './TestimonialCarouselDemo.css';

const TestimonialCarouselDemo = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/testimonials');
        if (response.data && response.data.data) {
          setTestimonials(response.data.data);
        } else {
          // Fallback testimonials if API fails
          setTestimonials([
            {
              id: 1,
              name: "Sarah Johnson",
              rating: 5,
              comment: "The food is absolutely delicious! I ordered the Margherita Pizza and it was the best I've ever had. Fast delivery too!",
              image: "https://randomuser.me/api/portraits/women/44.jpg"
            },
            {
              id: 2,
              name: "Michael Chen",
              rating: 4,
              comment: "Great service and tasty food. The Veggie Wrap is my favorite. Will definitely order again!",
              image: "https://randomuser.me/api/portraits/men/32.jpg"
            },
            {
              id: 3,
              name: "Emily Rodriguez",
              rating: 5,
              comment: "I'm impressed with the quality and freshness of the ingredients. The Caesar Salad is amazing!",
              image: "https://randomuser.me/api/portraits/women/68.jpg"
            }
          ]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setLoading(false);
        // Set fallback testimonials
        setTestimonials([
          {
            id: 1,
            name: "Sarah Johnson",
            rating: 5,
            comment: "The food is absolutely delicious! I ordered the Margherita Pizza and it was the best I've ever had. Fast delivery too!",
            image: "https://randomuser.me/api/portraits/women/44.jpg"
          },
          {
            id: 2,
            name: "Michael Chen",
            rating: 4,
            comment: "Great service and tasty food. The Veggie Wrap is my favorite. Will definitely order again!",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
          },
          {
            id: 3,
            name: "Emily Rodriguez",
            rating: 5,
            comment: "I'm impressed with the quality and freshness of the ingredients. The Caesar Salad is amazing!",
            image: "https://randomuser.me/api/portraits/women/68.jpg"
          }
        ]);
      }
    };

    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (loading) {
    return (
      <div className="testimonial-section">
        <div className="testimonial-container loading">
          <div className="loading-spinner"></div>
          <p>Loading testimonials...</p>
        </div>
      </div>
    );
  }

  if (!testimonials.length) {
    return null;
  }

  return (
    <div className="testimonial-section">
      <h2 className="section-title">What Our Customers Say</h2>
      
      <div className="testimonial-carousel-container">
        <button 
          className="carousel-arrow prev-arrow" 
          onClick={prevTestimonial}
          aria-label="Previous testimonial"
        >
          <FaChevronLeft />
        </button>
        
        <div className="testimonial-carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="testimonial-card"
            >
              <div className="quote-icon top">
                <FaQuoteLeft />
              </div>
              
              <div className="testimonial-content">
                <div className="testimonial-image">
                  <img 
                    src={testimonials[currentIndex].image || "https://randomuser.me/api/portraits/lego/1.jpg"} 
                    alt={testimonials[currentIndex].name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://randomuser.me/api/portraits/lego/1.jpg";
                    }}
                  />
                </div>
                
                <p className="testimonial-text">{testimonials[currentIndex].comment}</p>
                
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={i < testimonials[currentIndex].rating ? "star filled" : "star"} 
                    />
                  ))}
                </div>
                
                <h3 className="testimonial-name">{testimonials[currentIndex].name}</h3>
              </div>
              
              <div className="quote-icon bottom">
                <FaQuoteRight />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <button 
          className="carousel-arrow next-arrow" 
          onClick={nextTestimonial}
          aria-label="Next testimonial"
        >
          <FaChevronRight />
        </button>
      </div>
      
      <div className="testimonial-indicators">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarouselDemo; 