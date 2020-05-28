const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

// Routes files
const users = require('./routes/users');

// Load env variables
dotenv.config({path: './config/.env'});

const app = express();

if ( app.get('env') === 'development' ) {
    app.use(morgan('dev'));
    console.log('Morgan enabled');
}

// Middlewares
app.use(helmet());

// Mount routers
app.use('/api/users', users);

const PORT = process.env.PORT || 3000;

app.listen( PORT, console.log(`Server running in ${app.get('env')} mode on port ${PORT}`));