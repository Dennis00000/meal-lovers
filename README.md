Meal Lovers - Food Delivery Application
Overview
Meal Lovers is a food delivery application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application allows users to browse menus, place orders, and manage their profiles. It also includes an admin panel for managing users, products, and orders.
Features
User Authentication: Users can register, log in, and manage their profiles.
Menu Browsing: Users can view a variety of food items categorized for easy navigation.
Order Management: Users can place orders and view their order history.
Admin Panel: Admins can manage users, products, and view order statistics.

Responsive Design: The application is designed to be mobile-friendly.
Project Structure

The project is divided into two main parts: the frontend and the backend.

Frontend
Directory: frontend/
Framework: React.js
State Management: Context API
Styling: Tailwind CSS
Routing: React Router

Backend
Directory: backend/
Framework: Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
Middleware: Custom middleware for error handling and authentication
Installation
Prerequisites
Node.js
MongoDB (local or cloud instance)

Steps
1. Clone the repository:
      git clone <repository-url>
   cd meal-lovers
2. Install backend dependencies:
      cd backend
   npm install
3. Set up environment variables:
   Create a .env file in the backend directory and add your MongoDB connection string and other necessary environment variables.
4. Run the backend server:
   npm run dev
5. Install frontend dependencies
      cd ../frontend
   npm install
6. Run the frontend server
   npm run dev

   Usage
Access the application in your browser at http://localhost:3000 for the frontend and http://localhost:5000 for the backend API.
Use the provided test credentials for logging in:
Email: test@example.com
Password: password123
Notes
The project structure is currently not well organized, which may lead to difficulties in navigation and maintenance. It is recommended to refactor the codebase for better organization and clarity.
Consider implementing a more modular approach, separating components, services, and utilities into distinct directories.
Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.
License
This project is licensed under the MIT License. See the LICENSE file for more details.
---
This README provides a basic overview of the Meal Lovers application, its features, installation instructions, and notes on organization. For further details, please refer to the codebase and comments within the files.
