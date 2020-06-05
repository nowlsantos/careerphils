const mongoose = require('mongoose');

const connectonOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}

const dbConnection = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI, connectonOptions);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.bold);
}

module.exports = dbConnection;