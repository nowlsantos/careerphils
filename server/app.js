const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const users = require('./routes/users');
const AppError = require('./utils/appError');
const errorHandler = require('./middleware/error');

// Express app
const app = express();

if ( process.env.NODE_ENV === 'development' ) {
    app.use(morgan('dev'));
    console.log('Morgan enabled');
}

// Middlewares
app.use(helmet());
app.use(express.json());

// Mount routers
app.use('/api/users', users);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));   
});

app.use(errorHandler);
  
module.exports = app;