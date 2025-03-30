import React from 'react';
import Image from './common/Image';

const ImageTest = () => {
  const testImages = [
    {
      src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      alt: 'Food 1'
    },
    {
      src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445',
      alt: 'Food 2'
    },
    {
      src: '/images/default-product.jpg',
      alt: 'Local image'
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Image Test</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testImages.map((img, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <Image 
              src={img.src}
              alt={img.alt}
              style={{ height: '200px' }}
              fallbackSrc="https://via.placeholder.com/300x200?text=Fallback"
            />
            <div className="p-2 bg-gray-100">
              <p className="text-sm font-medium">{img.alt}</p>
              <p className="text-xs text-gray-500 truncate">{img.src}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageTest; 