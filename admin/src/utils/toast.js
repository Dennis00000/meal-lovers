import { toast } from 'react-toastify';

// Default toast configuration
const defaultOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
};

// Toast utility functions
export const showToast = {
  success: (message, options = {}) => {
    return toast.success(message, { ...defaultOptions, ...options });
  },
  error: (message, options = {}) => {
    return toast.error(message, { ...defaultOptions, ...options });
  },
  info: (message, options = {}) => {
    return toast.info(message, { ...defaultOptions, ...options });
  },
  warning: (message, options = {}) => {
    return toast.warning(message, { ...defaultOptions, ...options });
  }
}; 