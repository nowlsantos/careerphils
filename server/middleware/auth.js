const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const AppError = require('../utils/appError');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler( async(req, res, next) => {
    let token;

    // Get token from the headers
    const { authorization } = req.headers;
    if ( authorization && authorization.startsWith('Bearer') ) {
        token = authorization.split(' ')[1];
    }

    // Make sure token exists
    if ( !token ) {
        return next( new AppError('Not authorized to access this route', 401));
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);

        // Check if the user no longer exists
        if ( !req.user ) {
            return next( new AppError('The user with this token no longer exist', 401));
        }

        // Check if the user changed password after the token was issued
        if ( req.user.changePasswordIAT(decoded.iat) ) {
            return next( new AppError('User recently changed password. Please login again', 401) );
        }

        // Grant access to the protected routes
        next();
    } catch (error) {
        return next( new AppError('Not authorized to access this route', 401));
    }
})

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if ( !roles.includes(req.user.role) ) {
            return next( new AppError('You do not have permission to perform this action', 403) );
        }
        next();
    }
}