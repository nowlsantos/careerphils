const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
            lowercase: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please add a valid email",
            ],
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
            minlength: [6, "Password should be at least 6 characters"],
            select: false,
        },
        confirmPassword: {
            type: String,
            required: [true, "Please confirm your password"],
            validate: {
                // This only works on CREATE and SAVE!!!
                validator: function (el) {
                    return el === this.password;
                },
                message: "Passwords are not the same!",
            },
            select: false,
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        passWordChangedAt: Date,
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        photo: {
            type: String,
            default: "default.jpg",
        },
        profile: {
            type: mongoose.Schema.ObjectId,
            ref: "Profile",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Cascade delete profiles when user is deleted
UserSchema.pre("remove", async function (next) {
    await this.model("Profile").deleteOne({ user: this._id });
    next();
});

// Reverse populate with virtuals
UserSchema.virtual("user_profile", {
    ref: "Profile",
    localField: "_id",
    foreignField: "user",
    justOne: true,
});

// Encrypts password using bcrypt
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    // Delete confirmPassword field
    this.confirmPassword = undefined;
    next();
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password") || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

// Sign JWT and return
UserSchema.methods.getSignJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Catch when password changed after issue
UserSchema.methods.changePasswordIAT = function (jwtTimeStamp) {
    if (this.passWordChangedAt) {
        const timestamp = parseInt(this.passWordChangedAt.getTime() / 1000, 10);
        return jwtTimeStamp < timestamp;
    }
    return false;
};

// Generate and hashed password token
UserSchema.methods.getPasswordResetToken = function () {
    // Genereate the token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashed token
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Set the expired
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
