const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const AppError = require('../utils/appError');

/*
    @desc       Get all users
    @route      GET api/users
    @access     Public
*/ 
exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find().populate('profiles');
    
    res.status(200).json({
        status: 'success',
        count: users.length,
        data: users
    })
});

/* 
    @desc       Get a single user
    @route      GET api/users/:id
    @access     Public
*/ 
exports.getUser = asyncHandler( async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if ( !user ) {
        return next( new AppError(`No user was found with an id of ${req.params.id}`) );
    }

    res.status(200).json({
        status: 'success',
        data: user
    })   
});

/* 
    @desc       Create a new user
    @route      POST api/users
    @access     Private
*/ 
exports.createUser = asyncHandler(async(req, res, next) => {
    // Add profile to the req.body
    req.body.profile = req.profile.id;

    const user = await User.create(req.body);

    res.status(201).json({
        status: 'success',
        data: user
    })   
});

/* 
    @desc       Update a user
    @route      PUT api/users/:id
    @access     Private
*/ 
exports.updateUser = asyncHandler( async(req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if ( !user ) {
        return next( new AppError(`No user was found with an id of ${req.params.id}`) );
    }

    res.status(200).json({
        status: 'success',
        data: user
    })
});

/* 
    @desc       Delete a single user
    @route      DELETE api/users/:id
    @access     private
*/ 
exports.deleteUser = asyncHandler( async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if ( !user ) {
        return next( new AppError(`No user was found with an id of ${req.params.id}`) );
    }

    user.remove();

    res.status(204).json({
        status: true,
        data: null
    })
});