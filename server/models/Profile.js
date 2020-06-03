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
    photo: String,
    jobtitle: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Profile', ProfileSchema);