import React, { useState, useEffect } from 'react';
import { FaImage } from 'react-icons/fa';

const Image = ({ src, alt, className, style, fallbackSrc }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  const defaultFallback = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
  
  useEffect(() => {
    // Log the image source for debugging
    console.log(`Image component: Loading image from ${src}`);
    
    // Check if src is a relative path that needs the API URL
    if (src && src.startsWith('/')) {
      // If it's a relative path, prepend the API URL
      const fullPath = `${window.location.origin}${src}`;
      console.log(`Converting relative path to: ${fullPath}`);
      setImageSrc(fullPath);
    } else if (src && src.includes('unsplash.com') && !src.includes('?')) {
      // Add quality parameters to Unsplash URLs if they don't already have query params
      const optimizedSrc = `${src}?q=85&w=800&auto=format&fit=crop`;
      console.log(`Optimizing Unsplash image: ${optimizedSrc}`);
      setImageSrc(optimizedSrc);
    } else {
      setImageSrc(src);
    }
  }, [src]);

  const handleError = () => {
    console.log(`Image error: Failed to load image from ${imageSrc}`);
    setError(true);
    
    // Try loading the image directly from Unsplash as a last resort
    if (imageSrc.includes('unsplash.com')) {
      const backupSrc = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800';
      console.log(`Trying backup image: ${backupSrc}`);
      setImageSrc(backupSrc);
    }
  };

  const handleLoad = () => {
    console.log(`Image loaded successfully: ${imageSrc}`);
    setLoaded(true);
  };

  return (
    <div className={`image-container ${className || ''}`} style={{ 
      position: 'relative',
      overflow: 'hidden',
      ...style 
    }}>
      {!loaded && !error && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#f0f0f0'
        }}>
          <FaImage style={{ color: '#ccc', fontSize: '24px' }} />
        </div>
      )}
      
      <img
        src={error ? (fallbackSrc || defaultFallback) : imageSrc}
        alt={alt || 'Image'}
        onError={handleError}
        onLoad={handleLoad}
        style={{ 
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        loading="lazy"
      />
    </div>
  );
};

export default Image; 