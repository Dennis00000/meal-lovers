import React, { useState, useEffect, useRef } from 'react';
import { 
  FaShoppingCart, FaFire, FaChevronLeft, FaChevronRight, FaSearch, 
  FaFilter, FaStar, FaLeaf, FaClock, FaUtensils, FaHeart, FaInfoCircle, FaPlus
} from 'react-icons/fa';
import './Menu.css';
import { useStore } from '../../Context/StoreContext';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { GradientButton } from '@/components/ui/gradient-button';

// Food image mapping
const foodImages = {
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop',
  cheeseburger: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop',
  baconburger: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&auto=format&fit=crop',
  veggieburger: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&auto=format&fit=crop',
  
  pizza: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&auto=format&fit=crop',
  margherita: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&auto=format&fit=crop',
  pepperoni: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop',
  
  pasta: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&auto=format&fit=crop',
  spaghetti: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=800&auto=format&fit=crop',
  carbonara: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop',
  lasagna: 'https://images.unsplash.com/photo-1619895092538-128341789043?w=800&auto=format&fit=crop',
  
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
  caesar: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&auto=format&fit=crop',
  greek: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop',
  
  dessert: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop',
  brownie: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&auto=format&fit=crop',
  cheesecake: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop',
  icecream: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop',
  
  drink: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop',
  coffee: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop',
  cocktail: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop',
  milkshake: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop',
  soda: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=800&auto=format&fit=crop',
  
  sandwich: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800&auto=format&fit=crop',
  club: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop',
  
  soup: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop',
  
  fries: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&auto=format&fit=crop',
  onionrings: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=800&auto=format&fit=crop',
  
  starters: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&auto=format&fit=crop',
  burgers: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop',
  salads: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
  desserts: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop',
  drinks: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop',
  
  default: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop'
};

const Menu = () => {
  const { food_list = [], addToCart, addToFavorite, favorites = [] } = useStore() || {};
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState([]);
  
  // Enhanced function to get appropriate image for food item
  const getFoodImage = (item) => {
    if (item.image) return item.image;
    
    const lowerName = item.name.toLowerCase();
    const lowerCategory = (item.category || '').toLowerCase();
    
    // First try to match by specific name
    for (const [key, url] of Object.entries(foodImages)) {
      if (lowerName.includes(key)) {
        return url;
      }
    }
    
    // If no match by name, try to match by category
    if (lowerCategory) {
      for (const [key, url] of Object.entries(foodImages)) {
        if (lowerCategory.includes(key) || key.includes(lowerCategory)) {
          return url;
        }
      }
    }
    
    // Default image based on category if available
    if (lowerCategory.includes('burger') || lowerCategory === 'burgers') {
      return foodImages.burger;
    } else if (lowerCategory.includes('pizza')) {
      return foodImages.pizza;
    } else if (lowerCategory.includes('pasta')) {
      return foodImages.pasta;
    } else if (lowerCategory.includes('salad') || lowerCategory === 'salads') {
      return foodImages.salad;
    } else if (lowerCategory.includes('dessert') || lowerCategory === 'desserts') {
      return foodImages.dessert;
    } else if (lowerCategory.includes('drink') || lowerCategory === 'drinks') {
      return foodImages.drink;
    } else if (lowerCategory.includes('starter') || lowerCategory === 'starters') {
      return foodImages.starters;
    }
    
    return foodImages.default;
  };
  
  // Fetch menu items from API
  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/menu');
      if (response.data && response.data.data) {
        const itemsWithImages = response.data.data.map(item => {
          return { 
            ...item, 
            isFeatured: item.isPopular || Math.random() > 0.7,
            image: getFoodImage(item),
            prepTime: Math.floor(Math.random() * 20) + 10,
            calories: Math.floor(Math.random() * 500) + 200,
            rating: item.rating || (Math.random() * 2 + 3).toFixed(1),
            reviews: item.reviews || Math.floor(Math.random() * 100) + 5
          };
        });
        setMenuItems(itemsWithImages);
      }
    } catch (error) {
      console.log('Error fetching menu:', error);
      toast.error('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Combine API menu items with store food list
  const allItems = [...(food_list || []), ...menuItems].map(item => ({
    ...item,
    image: item.image || getFoodImage(item),
    prepTime: item.prepTime || Math.floor(Math.random() * 20) + 10,
    calories: item.calories || Math.floor(Math.random() * 500) + 200,
    rating: item.rating || (Math.random() * 2 + 3).toFixed(1),
    reviews: item.reviews || Math.floor(Math.random() * 100) + 5
  }));
  
  // Get categories
  const categoriesData = ['All', ...new Set(allItems.map(item => item.category).filter(Boolean))];
  
  // Filter items based on search and category
  const filteredItems = allItems.filter(item => {
    const matchesSearch = !searchTerm || 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get featured items
  const featuredItems = filteredItems.filter(item => item.isFeatured || item.isPopular);

  const handleAddToCart = (item) => {
    if (addToCart) {
      addToCart(item);
      toast.success(`${item.name} added to cart!`);
    }
  };
  
  const toggleFavorite = (id) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    
    addToFavorite(newFavorites);
    
    toast.success(
      favorites.includes(id) 
        ? `${allItems.find(item => item.id === id)?.name || 'Item'} removed from favorites` 
        : `${allItems.find(item => item.id === id)?.name || 'Item'} added to favorites`
    );
  };

  const nextSlide = () => {
    setCurrentSlide(prev => 
      prev === Math.max(0, featuredItems.length - 3) ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(prev => 
      prev === 0 ? Math.max(0, featuredItems.length - 3) : prev - 1
    );
  };

  // Format price
  const formatPrice = (price) => {
    return `€${Number(price || 0).toFixed(2)}`;
  };
  
  // Show item details
  const showItemDetails = (item) => {
    setSelectedItem(item);
  };
  
  // Close item details
  const closeItemDetails = () => {
    setSelectedItem(null);
  };

  return (
    <div className="menu-page-dark">
      <div className="menu-header">
        <h1>Our Menu</h1>
        <div className="search-container">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search for dishes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="filter-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter />
            <span>Filter</span>
          </button>
        </div>
        
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              className="category-filters"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="category-tabs">
                {categoriesData.map(category => (
                  <button
                    key={category}
                    className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="menu-container">
        {/* Featured Items Section */}
        {featuredItems.length > 0 && (
          <section className="featured-section">
            <h2>Featured Items</h2>
            <p>Our most popular dishes that customers love</p>
            
            <div className="featured-carousel-container">
              <button className="carousel-nav prev" onClick={prevSlide} aria-label="Previous slide">
                <FaChevronLeft />
              </button>
              
              <div className="featured-items">
                {featuredItems.slice(currentSlide, currentSlide + 3).map(item => (
                  <motion.div 
                    className="featured-item" 
                    key={item.id || item._id}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="featured-image-container">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="featured-image"
                      />
                      <div className="featured-badge">
                        <FaFire />
                        <span>Featured</span>
                      </div>
                      {item.isVegetarian && (
                        <div className="veg-badge">
                          <FaLeaf />
                        </div>
                      )}
                      <button 
                        className={`favorite-button ${favorites.includes(item.id) ? 'active' : ''}`}
                        onClick={() => toggleFavorite(item.id)}
                      >
                        <FaHeart />
                      </button>
                      <button 
                        className="info-button"
                        onClick={() => showItemDetails(item)}
                      >
                        <FaInfoCircle />
                      </button>
                    </div>
                    <div className="featured-content">
                      <div className="item-rating">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < Math.floor(item.rating || 4) ? 'star-filled' : 'star-empty'} />
                        ))}
                        <span>({item.reviews})</span>
                      </div>
                      <h3>{item.name}</h3>
                      <p>{item.description || `Delicious ${item.name.toLowerCase()} prepared with fresh ingredients`}</p>
                      
                      <div className="item-details">
                        <div className="detail">
                          <FaClock />
                          <span>{item.prepTime} min</span>
                        </div>
                        <div className="detail">
                          <FaUtensils />
                          <span>{item.calories} cal</span>
                        </div>
                      </div>
                      
                      <div className="featured-footer">
                        <span className="price">{formatPrice(item.price)}</span>
                        <button 
                          className="add-cart-btn"
                          onClick={() => handleAddToCart(item)}
                        >
                          <FaShoppingCart />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <button className="carousel-nav next" onClick={nextSlide} aria-label="Next slide">
                <FaChevronRight />
              </button>
            </div>
          </section>
        )}
        
        {/* All Menu Items */}
        <section className="menu-items-section">
          <h2>{selectedCategory === 'All' ? 'All Menu Items' : selectedCategory}</h2>
          
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading menu items...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="no-results">
              <h3>No items found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="menu-grid">
              {filteredItems.map(item => (
                <motion.div 
                  className="menu-item-card"
                  key={item.id || item._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="menu-item-image-container">
                    <img 
                      src={getFoodImage(item)} 
                      alt={item.name} 
                      className="menu-item-image" 
                      onClick={() => showItemDetails(item)}
                    />
                  </div>
                  <div className="menu-item-content">
                    <div className="menu-item-price">{formatPrice(item.price)}</div>
                    <h3 className="menu-item-name">{item.name}</h3>
                    <p className="menu-item-description">{item.description}</p>
                    <div className="menu-item-actions">
                      <div className="quantity-selector">
                        <span>1</span>
                      </div>
                      <button 
                        className="add-to-cart-button"
                        onClick={() => handleAddToCart(item)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
      
      {/* Item Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            className="item-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeItemDetails}
          >
            <motion.div 
              className="item-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="close-modal" onClick={closeItemDetails}>×</button>
              <div className="item-modal-content">
                <div className="item-modal-image">
                  <img src={selectedItem.image} alt={selectedItem.name} />
                  {selectedItem.isVegetarian && (
                    <div className="veg-badge large">
                      <FaLeaf />
                      <span>Vegetarian</span>
                    </div>
                  )}
                </div>
                <div className="item-modal-details">
                  <h2>{selectedItem.name}</h2>
                  
                  <div className="item-rating large">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(selectedItem.rating || 4) ? 'star-filled' : 'star-empty'} />
                    ))}
                    <span>{selectedItem.rating} ({selectedItem.reviews} reviews)</span>
                  </div>
                  
                  <p className="item-description">{selectedItem.description || `Delicious ${selectedItem.name.toLowerCase()} prepared with fresh ingredients`}</p>
                  
                  <div className="item-specs">
                    <div className="spec">
                      <FaClock />
                      <div>
                        <span className="spec-label">Prep Time</span>
                        <span className="spec-value">{selectedItem.prepTime} minutes</span>
                      </div>
                    </div>
                    <div className="spec">
                      <FaUtensils />
                      <div>
                        <span className="spec-label">Calories</span>
                        <span className="spec-value">{selectedItem.calories} cal</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="item-modal-actions">
                    <span className="modal-price">{formatPrice(selectedItem.price)}</span>
                    <div className="modal-buttons">
                      <button 
                        className={`favorite-btn ${favorites.includes(selectedItem.id) ? 'active' : ''}`}
                        onClick={() => toggleFavorite(selectedItem.id)}
                      >
                        <FaHeart />
                        <span>{favorites.includes(selectedItem.id) ? 'Saved' : 'Save'}</span>
                      </button>
                      <button 
                        className="add-cart-btn large"
                        onClick={() => {
                          handleAddToCart(selectedItem);
                          closeItemDetails();
                        }}
                      >
                        <FaShoppingCart />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;