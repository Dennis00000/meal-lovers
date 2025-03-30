                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Verify from './pages/Verify/Verify'
import Menu from './pages/Menu/Menu'
import { StoreContextProvider } from './Context/StoreContext'
import ProtectedRoute from './components/ProtectedRoute'
import ContactUs from './pages/ContactUs/ContactUs'
import AboutUs from './pages/AboutUs/AboutUs'
import Legal from './pages/Legal/Legal'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Profile from './pages/Profile/Profile'
import ErrorBoundary from './components/ErrorBoundary'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Checkout from './pages/Checkout/Checkout'
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation'
import ProfilePage from './pages/ProfilePage'
import DebugPanel from './components/DebugPanel'
import OrdersPage from './pages/OrdersPage'
import ProtectedRouteWrapper from './components/ProtectedRouteWrapper'
import OrderDetails from './pages/OrderDetails/OrderDetails'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import PrivacySettings from './pages/PrivacySettings/PrivacySettings'

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <ErrorBoundary>
      <AuthProvider>
        <StoreContextProvider>
          <Elements stripe={stripePromise}>
            <ToastContainer />
            <Navbar setShowLogin={setShowLogin} />
            <main className="main-content">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/menu' element={<Menu />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/order' element={<PlaceOrder />} />
                
                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path='/my-orders' element={<MyOrders />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/profile-page' element={
                    <ProtectedRouteWrapper>
                      <ProfilePage />
                    </ProtectedRouteWrapper>
                  } />
                </Route>
                
                <Route path='/verify' element={<Verify />} />
                <Route path='/contact' element={<ContactUs />} />
                <Route path='/about' element={<AboutUs />} />
                <Route path='/legal' element={<Legal />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/order-confirmation/:id' element={<OrderConfirmation />} />
                <Route path='/orders' element={<OrdersPage />} />
                <Route path='/my-orders' element={
                  <ProtectedRouteWrapper>
                    <OrdersPage />
                  </ProtectedRouteWrapper>
                } />
                <Route path='/order-details/:orderId' element={<OrderDetails />} />
                <Route path='/change-password' element={<ChangePassword />} />
                <Route path='/privacy-settings' element={<PrivacySettings />} />
                <Route path='*' element={<div className="text-center py-20"><h1 className="text-3xl">Page Not Found</h1></div>} />
              </Routes>
            </main>
            <Footer />
            <DebugPanel />
          </Elements>
        </StoreContextProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
