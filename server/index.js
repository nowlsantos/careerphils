require('dotenv').config();
const dbConnection = require('./config/db');
const colors = require('colors');

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    process.exit(1);
});
  
// Load the app
const app = require('./app');

// Connect to database
dbConnection();

const PORT = process.env.PORT === 'production' ? process.env.PORT : 3000;
const server = app.listen(PORT, '0.0.0.0');

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    // Close server and process exit
    server.close( () => process.exit(1) );
})

process.on('SIGTERM', () => {
    console.log('SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      console.log('Process terminated!');
    });
});