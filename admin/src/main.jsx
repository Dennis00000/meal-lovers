import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import './styles/darkMode.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
// Remove the Ant Design CSS import completely

// Check if dark mode was previously enabled
const checkDarkMode = () => {
  const settings = localStorage.getItem('adminSettings');
  if (settings) {
    const { darkMode } = JSON.parse(settings);
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    }
  }
};

// Apply dark mode if needed
checkDarkMode();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
