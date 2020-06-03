const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const users = require('./routes/users');
const profiles = require('./routes/profiles');
const auth = require('./routes/auth');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const errorHandler = require('./middleware/error');
//const mongoSanitize = require('express-mongo-sanitize');

// Express app
const app = express();

// Development logging
if ( process.env.NODE_ENV === 'development' ) {
    app.use(morgan('dev'));
    console.log('Morgan enabled');
}

// Security Http headers
app.use(helmet());

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());
//app.use(mongoSanitize());

// Mount routers
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/profiles', profiles);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));   
});

app.use(errorHandler);
  
module.exports = app;