// Remove the Button import
// import { Button } from './ui/button';
// import './ui/Button.css';

// Example of how to use a standard button in the component
const AddProduct = () => {
  // ... other component code

  return (
    <form onSubmit={handleSubmit}>
      {/* ... form fields */}
      
      <button 
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProduct; 