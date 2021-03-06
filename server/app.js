const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const users = require('./routes/users');
const profiles = require('./routes/profiles');
const auth = require('./routes/auth');
const AppError = require('./utils/appError');
const errorHandler = require('./middleware/error');
const mongoSanitize = require('express-mongo-sanitize');

// Express app
const app = express();

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log('Morgan enabled');
}

// Serve static files
app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, '../dist')));

// Security Http headers
app.use(helmet());

// Prevent xss attack
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Sanitize data
app.use(mongoSanitize());

// Compress data
app.use(compression());

// Mount routers
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/admin', users);
app.use('/api/profiles', profiles);

app.use(errorHandler);

app.get('*', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '../dist/index.html'));
})

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
