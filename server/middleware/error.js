const AppError = require('../utils/appError');

const handleCastError = err => {
    const message = 'Resource not found';
    return new AppError(message, 400);
}

const handleDuplicateObjError = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    
    const message = `Duplicate field value entered: ${value}. Please use another value!`;
    return new AppError(message, 400);
}

const handleValidationError = err => {
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
}

const handleJWTError = () => new AppError('Invalid Token. Please login again', 401);

const handleJWTExpiredError = () => new AppError('Your token has expired. Please login again', 401);

const sendProdError = (err, res) => {
    // Operational trusted error
    if ( err.isOperational ) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    // Programming or unknown error: don't leak error details
    } else {
        // Log the error
        console.error('Error: ', err);

        // Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        })   
    }
}

const sendDevError = (err, res) => {
    res.status(err.statusCode).json({
        success: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if ( process.env.NODE_ENV === 'development' ) {
        sendDevError(err, res);
    } 
    else if ( process.env.NODE_ENV === 'production' ) {
        let error = {...err};
        if ( error.name === 'CastError' ) error = handleCastError(error);
        if ( err.code === 11000 ) error = handleDuplicateObjError(error);
        if ( err.name === 'ValidationError' ) error = handleValidationError(error);
        if ( err.name === 'JsonWebTokenError' ) error = handleJWTError(error);
        if ( err.name === 'TokenExpiredError' ) error = handleJWTExpiredError(error);

        sendProdError(error, res);
    }
}

module.exports = errorHandler;