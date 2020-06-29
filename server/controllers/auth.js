const crypto = require("crypto");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/sendEmail");

/* 
    @desc       Register user
    @route      POST api/auth/register
    @access     Public
*/

exports.register = asyncHandler(async (req, res, next) => {
    const { email, password, confirmPassword } = req.body;

    // Create user
    const user = await User.create({
        email,
        password,
        confirmPassword,
    });

    // Token response
    sendTokenResponse(user, 200, res);
});

/* 
    @desc       Login user
    @route      POST api/auth/login
    @access     Public
*/
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
        return next(new AppError("Please provide an email and password", 400));
    }

    // Check if user exist
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new AppError("Invalid credentials", 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return next(new AppError("Invalid credentials", 401));
    }

    // Token response
    sendTokenResponse(user, 200, res);
});

/* 
    @desc       Logout user
    @route      GET api/auth/logout
    @access     Public
*/
exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie("token", "none", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    res.status(200).json({
        status: "success",
        data: {},
    });
});

/* 
    @desc       Get the currrent logged in user
    @route      Get api/auth/me
    @access     Private
*/
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        status: "success",
        data: user,
    });
});

/* 
    @desc       Forgot password
    @route      POST api/auth/forgotpassword
    @access     Private
*/
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    // 1: Get user based on posted email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new AppError("No registered user with that email", 404));
    }

    // 2: Generate the random reset token
    const resetToken = user.getPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3: Send it to user's email
    const resetUrl = `${req.protocol}://${req.get(
        "host"
    )}/api/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. \nIf you didn't forgot your password, please ignore this email`;

    try {
        await sendEmail({
            email: user.email,
            Subject: "Your password reset token (valid for 10 minutes)",
            message,
        });

        res.status(200).json({
            status: "success",
            data: "Token sent to email",
        });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(
            new AppError(
                "There was an error sending the email. Try again later!"
            ),
            500
        );
    }
});

/* 
    @desc       Reset password
    @route      PUT api/auth/resetpassword
    @access     Private
*/
exports.resetPassword = asyncHandler(async (req, res, next) => {
    // 1: Get the hashed token
    const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    // 2: Get user based on the token
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    // 3: No user was found with the hashed token
    if (!user) {
        return next(new AppError("Invalid token or has expired"), 400);
    }

    // 3: If the token has not expired and there is a user, set a new password
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;

    // 4: Reset the two token variables to remove from the output
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // 5: Save and send the response
    await user.save();
    sendTokenResponse(user, 200, res);
});

/* 
    @desc       Update user detail
    @route      PUT api/auth/updatedetails
    @access     Private
*/
exports.updateDetails = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
        email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: "success",
        data: user,
    });
});

/* 
    @desc       Update the  password
    @route      PATCH api/auth/updatepassword
    @access     Private
*/
exports.updatePassword = asyncHandler(async (req, res, next) => {
    // 1: Get the user from the collection
    const user = await User.findById(req.user.id).select("+password");

    // 2: Check if the posted password is correct
    if (!(await user.matchPassword(req.body.currentPassword))) {
        return next(new AppError("Current password is incorrect"), 401);
    }

    // 3: If correct update the password
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    await user.save();

    // 4: Login the user and send JWT
    sendTokenResponse(user, 200, res);
});

// Get token from the model, create a cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignJwtToken();

    const expiration = process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000;

    const options = {
        expires: new Date(Date.now() + expiration),
        httpOnly: true,
    };

    // User for https
    if (process.env.NODE_ENV === "production") {
        options.secure = true;
    }

    // remove password and confirm password from output
    user.password = undefined;
    user.confirmPassword = undefined;

    res.status(statusCode).cookie("token", token, options).json({
        status: "success",
        data: user,
        token,
    });
};
