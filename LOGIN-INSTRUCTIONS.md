# Login Instructions

## Normal Login
Use your registered email and password to log in to the application.

## Test Mode / Offline Mode
If the backend server is not running or you're working offline, you can use the test credentials:

- **Email**: test@example.com
- **Password**: password

This will create a mock user session that allows you to test the frontend functionality without a working backend.

## Troubleshooting Login Issues

1. **Connection Issues**
   - Check if the backend server is running
   - Verify the API URL in your .env file
   - Use the Debug Panel to test API connectivity

2. **Authentication Issues**
   - Clear your browser's local storage and try again
   - Check browser console for specific error messages
   - Try the test credentials to verify the login form is working

3. **Backend Issues**
   - Check the backend logs for errors
   - Verify the database connection
   - Ensure the authentication routes are properly configured 