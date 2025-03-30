import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../utils/errorResponse.js';
import User from '../models/User.js';
import Admin from '../models/Admin.js';

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
        // Set token from cookie
        token = req.cookies.token;
    }

    // Make sure token exists
    if (!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if this is an admin route
        const isAdminRoute = req.originalUrl.includes('/api/admin') || 
                             req.originalUrl.includes('/api/users') || 
                             req.originalUrl.includes('/api/orders');
        
        if (isAdminRoute) {
            req.user = await Admin.findById(decoded.id);
            if (!req.user) {
                // If not found in Admin model, try User model for routes that both can access
                if (req.originalUrl.includes('/api/users') || req.originalUrl.includes('/api/orders')) {
                    req.user = await User.findById(decoded.id);
                }
            }
        } else {
            // For regular user routes
            req.user = await User.findById(decoded.id);
        }

        if (!req.user) {
            return next(new ErrorResponse('User not found', 404));
        }

        next();
    } catch (err) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
});

// Grant access to specific roles
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ErrorResponse('Not authorized to access this route', 401));
        }
        
        // For admin users, allow access if they have any admin role
        if (req.user.role === 'admin' || req.user.role === 'super') {
            return next();
        }
        
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(
                    `User role ${req.user.role} is not authorized to access this route`,
                    403
                )
            );
        }
        next();
    };
};