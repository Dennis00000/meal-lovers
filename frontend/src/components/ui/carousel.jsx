import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

const Carousel = React.forwardRef(
  ({ className, children, setApi, ...props }, ref) => {
    const containerRef = useRef(null);
    const [api, setInternalApi] = useState(null);

    useEffect(() => {
      if (containerRef.current) {
        const scrollContainer = containerRef.current;
        
        const carouselApi = {
          scrollTo: (index) => {
            const items = scrollContainer.querySelectorAll('[data-carousel-item]');
            if (items[index]) {
              scrollContainer.scrollTo({
                left: items[index].offsetLeft,
                behavior: 'smooth'
              });
            }
          },
          selectedScrollSnap: () => {
            const scrollLeft = scrollContainer.scrollLeft;
            const items = scrollContainer.querySelectorAll('[data-carousel-item]');
            let closestIndex = 0;
            let closestDistance = Infinity;
            
            items.forEach((item, index) => {
              const distance = Math.abs(item.offsetLeft - scrollLeft);
              if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
              }
            });
            
            return closestIndex;
          },
          on: (event, callback) => {
            if (event === 'select') {
              const handleScroll = () => {
                requestAnimationFrame(callback);
              };
              scrollContainer.addEventListener('scroll', handleScroll);
              return () => scrollContainer.removeEventListener('scroll', handleScroll);
            }
            return () => {};
          }
        };
        
        setInternalApi(carouselApi);
        if (setApi) setApi(carouselApi);
      }
    }, [setApi]);

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        <div
          ref={containerRef}
          className="overflow-x-auto flex snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
        </div>
      </div>
    );
  }
);

Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex", className)}
      {...props}
    />
  )
);

CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-carousel-item
      className={cn("min-w-full flex-shrink-0 snap-center", className)}
      {...props}
    />
  )
);

CarouselItem.displayName = "CarouselItem";

export { Carousel, CarouselContent, CarouselItem }; 