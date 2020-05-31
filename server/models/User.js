const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [40, 'Name must have less or equal then 40 characters'],
        minlength: [10, 'Name must have more or equal then 10 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        lowercase:  true,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please add a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password should be at least 6 characters'],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    passWordChangedAt: Date,
    role: {
        type: String,
        enum: ['user', 'publisher'],
        default: 'user'
    },
    photo: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    profile: {
        type: mongoose.Schema.ObjectId,
        ref: 'Profile'
    }
})

// Encrypts password using bcrypt
UserSchema.pre('save', async function(next) {
    if ( !this.isModified('password') ) {
        return next();
    }

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
})

// Sign JWT and return
UserSchema.methods.getSignJwtToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Catch when password changed after issue
UserSchema.methods.changePasswordIAT = function(jwtTimeStamp) {
    if ( this.passWordChangedAt ) {
        const timestamp = parseInt(this.passWordChangedAt.getTime() / 1000, 10);
        return jwtTimeStamp < timestamp;
    }
    return false;
}

module.exports = mongoose.model('User', UserSchema);
