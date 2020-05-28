const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

// Load env variables
dotenv.config({path: './config/config.env'});

const app = express();

// Middlewares
app.use(helmet());

if ( app.get('env') === 'development' ) {
    app.use(morgan('dev'));
    console.log('Morgan enabled');
}

const PORT = process.env.PORT || 3000;

app.listen( PORT, console.log(`Server running in ${app.get('env')} mode on port ${PORT}`));