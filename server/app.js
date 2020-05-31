const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const users = require('./routes/users');
const auth = require('./routes/auth');
const cookieParser = require('cookie-parser');
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
app.use(cookieParser());

// Mount routers
app.use('/api/users', users);
app.use('/api/auth', auth);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));   
});

app.use(errorHandler);
  
module.exports = app;