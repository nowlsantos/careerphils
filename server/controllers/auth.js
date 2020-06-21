const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const AppError = require('../utils/appError');

/* 
    @desc       Register user
    @route      POST api/auth/register
    @access     Public
*/ 
exports.register = asyncHandler( async(req, res, next) => {
    const { email, password } = req.body;

    // Create user
    const user = await User.create({
        email, password
    })

    // Token response
    sendTokenResponse(user, 200, res);
});

/* 
    @desc       Login user
    @route      POST api/auth/login
    @access     Public
*/
exports.login = asyncHandler( async(req, res, next) => {
    const { email, password } = req.body;

    // Validate email and password
    if ( !email || !password ) {
        return next(new AppError('Please provide an email and password', 400));
    }

    // Check if user exist
    const user = await User.findOne( {email } ).select('+password');
    if ( !user ) {
        return next(new AppError('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if ( !isMatch ) {
        return next(new AppError('Invalid credentials', 401));
    }

    // Token response
    sendTokenResponse(user, 200, res);
})

/* 
    @desc       Logout user
    @route      GET api/auth/logout
    @access     Public
*/
exports.logout = asyncHandler(async(req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })

    res.status(200).json({
        status: 'success',
        data: {}
    })
})

/* 
    @desc       Get the currrent logged in user
    @route      Get api/auth/me
    @access     Public
*/
exports.getMe = asyncHandler( async(req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        status: 'success',
        data: user
    })
})

/* 
    @desc       Forgot password
    @route      POST api/auth/forgotpassword
    @access     Public
*/
exports.forgotPassword = asyncHandler( async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email} );

    if ( !user ) {
        return next(new AppError('No registered user with that email', 404));
    }

    // Get reset token
    const resetToken = user.getPasswordResetToken();

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        status: 'success',
        data: user
    })
})

// Get token from the model, create a cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignJwtToken();

    const expiration = process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000;

    const options = {
        expires: new Date(Date.now() + expiration),
        httpOnly: true
    }

    // User for https
    if ( process.env.NODE_ENV === 'production' ) {
        options.secure = true;
    }

    res.status(statusCode)
       .cookie('token', token, options)
       .json({
            status: 'success',
            data: user,
            token
    })
}