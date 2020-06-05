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

const PORT = process.env.PORT === 'production'? (process.env.PORT || 8080) : 3000;
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.inverse));

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`unhandledRejection: ${err.message}`);

    // Close server and process exit
    server.close( () => process.exit(1) );
})