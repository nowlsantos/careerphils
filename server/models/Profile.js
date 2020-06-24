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
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        lowercase:  true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please add a valid email']
    },
    phone: {
        type: String,
        required: [20, 'Phone number can not be longer than 20 characters']
    },
    birthdate: {
        type: Date,
        required: [true, 'Please add a birth date']
    },
    photo: String,
    location: {
        type: String,
        required: [true, 'Please add an address or location']
    },
    position: {
        type: String,
        required: [true, 'Please add a designation or position']
    },
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