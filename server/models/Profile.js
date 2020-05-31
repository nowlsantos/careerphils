const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please add your first name'],
        trim: true,
    },
    lastname: {
        type: String,
        required: [true, 'Please add your last name'],
        trim: true,
    },
    mobile: Number,
    birthdate: Date,
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    },
    photo: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Profile', ProfileSchema);