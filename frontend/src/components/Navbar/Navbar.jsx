import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { useStore } from '../../Context/StoreContext'
import { 
  FaShoppingBag, 
  FaUserCircle, 
  FaBars, 
  FaTimes, 
  FaSignInAlt,
  FaUserAlt,
  FaBoxOpen,
  FaSignOutAlt,
  FaChevronDown
} from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import UserDropdown from '../UserDropdown'

const Navbar = () => {
  const { cartItems } = useStore()
  const [click, setClick] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)
  
  const toggleDropdown = () => setDropdown(!dropdown)
  const closeDropdown = () => setDropdown(false)
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleLogout = async () => {
    try {
      await logout()
      closeDropdown()
      navigate('/')
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setClick(false)
    // Close user dropdown when route changes
    setDropdown(false)
    setShowMobileMenu(false)
  }, [location])

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="Meal Lovers" className="h-10" />
            <span className="ml-2 text-xl font-bold">Meal Lovers</span>
          </Link>
          
          {/* Desktop Navigation - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/menu" className="nav-link">Menu</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="cart-icon">
              <FaShoppingBag />
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </Link>
            
            <div className="relative">
              <div 
                className="user-menu flex items-center gap-1" 
                onClick={toggleDropdown}
              >
                <FaUserAlt />
                <span className="ml-1">Account</span>
                <FaChevronDown className="text-xs ml-1" />
              </div>
              
              {dropdown && (
                <div className="account-dropdown">
                  {currentUser ? (
                    <>
                      <div className="dropdown-user-info">
                        <FaUserCircle className="text-2xl" />
                        <div>
                          <p className="font-medium">{currentUser.email}</p>
                          <p className="text-sm opacity-70">Logged in</p>
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <Link to="/profile-page" className="dropdown-item" onClick={closeDropdown}>
                        <FaUserAlt className="dropdown-icon" />
                        Profile
                      </Link>
                      <Link to="/my-orders" className="dropdown-item" onClick={closeDropdown}>
                        <FaBoxOpen className="dropdown-icon" />
                        My Orders
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item text-red-500" onClick={handleLogout}>
                        <FaSignOutAlt className="dropdown-icon" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="dropdown-item" onClick={closeDropdown}>
                        <FaSignInAlt className="dropdown-icon" />
                        Login
                      </Link>
                      <Link to="/register" className="dropdown-item" onClick={closeDropdown}>
                        <FaUserAlt className="dropdown-icon" />
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Hamburger menu - ONLY visible on mobile */}
            <div 
              className={`hamburger-menu hidden sm:hidden ${mobileMenuOpen ? 'open' : ''}`} 
              onClick={toggleMobileMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link" onClick={toggleMobileMenu}>Home</Link>
        <Link to="/menu" className="nav-link" onClick={toggleMobileMenu}>Menu</Link>
        <Link to="/about" className="nav-link" onClick={toggleMobileMenu}>About Us</Link>
        <Link to="/contact" className="nav-link" onClick={toggleMobileMenu}>Contact</Link>
      </div>
    </nav>
  )
}

export default Navbar
