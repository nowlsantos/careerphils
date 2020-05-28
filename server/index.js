require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const dbConnection = require('./config/db');
const colors = require('colors');

// Connect to database
dbConnection();

// Routes files
const users = require('./routes/users');

const app = express();

if ( process.env.NODE_ENV === 'development' ) {
    app.use(morgan('dev'));
    console.log('Morgan enabled');
}

// Middlewares
app.use(helmet());

// Mount routers
app.use('/api/users', users);

const PORT = process.env.PORT || 3000;

const server = app.listen( PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.inverse));

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`ERROR: ${err.message}`);

    // Close server and process exit
    server.close( () => process.exit(1) );
})