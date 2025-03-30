export const getImageUrl = (item) => {
  if (!item) return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop";
  
  if (item.image && typeof item.image === 'string' && item.image.trim() !== '') {
    return item.image;
  }
  
  const foodImages = {
    burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop',
    pizza: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&auto=format&fit=crop',
    pasta: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&auto=format&fit=crop',
    salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
    dessert: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop',
    drink: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop',
    sandwich: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800&auto=format&fit=crop',
    soup: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop',
    platter: 'https://images.unsplash.com/photo-1600443287227-3ad0f62a2329?w=800&auto=format&fit=crop',
    tacos: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800&auto=format&fit=crop',
    wrap: 'https://images.unsplash.com/photo-1600850056064-a8b380df8395?w=800&auto=format&fit=crop',
    default: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop'
  };
  
  const name = (item.name || '').toLowerCase();
  
  for (const [key, url] of Object.entries(foodImages)) {
    if (name.includes(key)) {
      return url;
    }
  }
  
  return foodImages.default;
}; 