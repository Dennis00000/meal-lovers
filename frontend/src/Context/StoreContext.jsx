import React, { createContext, useEffect, useState, useContext } from "react";
import { food_list as initialFoodList, menu_list } from "../assets/assets";
import axios from "axios";
import { API_URL } from "../config";

// Create context
export const StoreContext = createContext(null);

// Custom hook to use the store context
export const useStore = () => useContext(StoreContext);

export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Fetch food items from API
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products`);
        if (response.data.success) {
          setFoodList(response.data.data);
        } else {
          console.error("Failed to fetch food items");
          // Fallback to initial data
          setFoodList(initialFoodList);
        }
      } catch (error) {
        console.error("Error fetching food items:", error);
        // Fallback to initial data
        setFoodList(initialFoodList);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
    setMenuList(menu_list);
  }, []);

  // Update cart count and total whenever cart items change
  useEffect(() => {
    let count = 0;
    let total = 0;
    
    cartItems.forEach(item => {
      count += item.quantity;
      total += item.price * item.quantity;
    });
    
    setCartCount(count);
    setCartTotal(total);
    
    // Save cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing saved cart:", error);
      }
    }
  }, []);

  // Add item to cart
  const addToCart = (item) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem._id === item._id);
      
      if (existingItemIndex !== -1) {
        // Item exists, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Item doesn't exist, add new item
        return [...prevItems, {
          _id: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1
        }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  const contextValue = {
    foodList,
    menuList,
    loading,
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};