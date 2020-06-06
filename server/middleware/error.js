const AppError = require('../utils/appError');

const handleCastError = () => {
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

const handleServerError = () => new AppError('Something wend wrong', 500);

const sendProdError = (err, req, res) => {
    // Operational trusted error
    if ( err.isOperational ) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    // Programming or unknown error: don't leak error details
    } else {
        // Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        })   
    }
}

const sendDevError = (err, req, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
    // if ( req.originalUrl.startsWith('/api') ) {
    // }
}

const errorHandler = (err, req, res, next) => {
    let error = {...err};
    
    err.statusCode = err.statusCode;
    err.status = err.status || 'error';

    error.message = err.message;
    
    /* switch ( true ) {
        case err.name === 'CastError':
            error = handleCastError();
            break;

        case err.code === 11000:
            error = handleDuplicateObjError(error);
            break;

        case err.name === 'ValidationError':
            error = handleValidationError(error);
            break;

        case err.name === 'JsonWebTokenError':
            error = handleJWTError();
            break;

        case err.name === 'TokenExpiredError':
            error = handleJWTExpiredError();
            break;

        default: 
            error = handleServerError();
    }
    
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    }) */

    if ( process.env.NODE_ENV === 'development' ) {
        sendDevError(err, req, res);
    } 
    else if ( process.env.NODE_ENV === 'production' ) {
        let error = {...err};
        error.message = err.message;

        if ( error.name === 'CastError' ) error = handleCastError(error);
        if ( err.code === 11000 ) error = handleDuplicateObjError(error);
        if ( err.name === 'ValidationError' ) error = handleValidationError(error);
        if ( err.name === 'JsonWebTokenError' ) error = handleJWTError(error);
        if ( err.name === 'TokenExpiredError' ) error = handleJWTExpiredError(error);

        sendProdError(error, req, res);
    }
    else {
        error = handleServerError();
    }
}

module.exports = errorHandler;