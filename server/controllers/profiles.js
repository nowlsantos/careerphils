const asyncHandler = require('../middleware/async');
const Profile = require('../models/Profile');
const User = require('../models/User');
const AppError = require('../utils/appError');

/* 
    @desc       Get profiles
    @route      POST api/profiles
    @route      POST api/users/:userId/profile
    @access     Public
*/ 
exports.getProfiles = asyncHandler(async(req, res, next) => {
    if ( req.params.userId ) {
        const profiles = await Profile.find( {user: req.params.userId} );

        return res.status(200).json({
            statuc: 'success',
            data: profiles
        })
    }
    else {
        res.status(200).json(res.apiFeatures);
    }
})

/* 
    @desc       Add a profile
    @route      POST api/users/:userId/profiles
    @access     Private only for logged in user
*/ 
exports.addProfile = asyncHandler(async(req, res, next) => {
    req.body.user = req.params.userId;

    const user = await User.findById(req.params.userId);
    if ( !user ) {
        return next( new AppError(`No User was found with an id of ${req.params.userId}`) );
    }

    const profile = await Profile.create(req.body);
    
    res.status(201).json({
        status: 'success',
        data: profile
    })   
});

/* 
    @desc       Get single profile
    @route      GET api/profiles/:id
    @access     Public
*/ 
exports.getProfile = asyncHandler( async(req, res, next) => {
    const profile = await Profile.findById(req.params.id).populate({
        path: 'user',
        select: 'firstname lastname'
    })

    if ( !profile ) {
        return next( new AppError(`No profile was found with an id of ${req.params.id}`) );
    }

    res.status(200).json({
        status: 'success',
        data: profile
    })   
});

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

/* 
    @desc       Update profile
    @route      GET api/profiles/:id
    @access     Private
*/ 
exports.updateProfile = asyncHandler( async(req, res, next) => {
    // 1: Reference to the profile object
    let profile = await Profile.findById(req.params.id);
    if ( !profile ) {
        return next( new AppError(`No profile was found with an id of ${req.params.id}`) );
    }

    // 2: The field to update
    const filteredBody = filterObj(req.body, 'firstname', 
                                             'lastname',
                                             'email',
                                             'phone',
                                             'location',
                                             'birthdate',
                                             'position');
    
    // const fieldsToUpdate = { firstname, lastname, email, phone, location, birthdate, position } = req.body;

    // 3: Proceed to update
    profile = await Profile.findByIdAndUpdate(req.params.id, filteredBody, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        status: 'success',
        data: profile
    })   
});

/* 
    @desc       Delete profile
    @route      GET api/profiles/:id
    @access     Private
*/ 
exports.deleteProfile = asyncHandler( async(req, res, next) => {
    const profile = await Profile.findById(req.params.id);

    if ( !profile ) {
        return next( new AppError(`No profile was found with an id of ${req.params.id}`) );
    }

    await profile.remove();

    res.status(200).json({
        status: 'success',
        data: {}
    })   
});