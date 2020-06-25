const path = require("path");
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const AppError = require('../utils/appError');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    
    // Image mimetype - image/jpg | jpeg | png
    if ( file.mimetype.startsWith('image') ) {
        if ( ext === 'jpg' || ext === 'jpeg' || ext === 'png' ) cb(null, true);
        else cb( new AppError('Please upload only images', 400), false);
    }
    // PDF mimetype - application/pdf
    else if ( file.mimetype.startsWith('application') ) {
        if ( ext === 'pdf' ) cb(null, true);
        else cb( new AppError('You need to upload a pdf'), 400, false);
    }
    
    // CSV mimetype - text/csv
    // else if ( file.mimetype.startsWith('text') ) {
    //     if ( ext === 'msword' ) cb(null, true);
    //     else cb( new AppError('You need to upload a word document'), 400, false);
    // }
    else {
        cb(new AppError('File format is not supported for upload'), 400, false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadUserFile = upload.single('fileItem');

exports.resizeUserPhoto = asyncHandler( async(req, res, next) => {
    if ( !req.file ) return next();

    req.file.filename = `user_${req.user.id}.jpeg`;

    await sharp(req.file.buffer)
                .resize(150, 150)
                .toFormat('jpeg')
                .jpeg({ quality: 75})
                .toFile(`dist/careerphils/assets/users/${req.file.filename}`);

    next();
});

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

/* 
    @desc       Upload a user photo
    @route      PUT api/users/:id/photo
    @access     Private
*/ 
exports.updateMe = asyncHandler( async(req, res, next) => {
    const filteredBody = filterObj(req.body, 'name', 'email');
    // if (req.file) filteredBody.photo = req.file.filename;
    if ( req.file ) req.body.photo = req.file.filename;

    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true
    })
    
    if ( !user ) {
        return next( new AppError(`No user was found with an id of ${req.params.id}`), 404 );
    }
    else if ( !req.file ) {
        return next( new AppError('Please upload a file'), 400 );
    }
    else {
        res.status(200).json({
            status: 'success',
            data: user
        })
    }
});

/*
    @desc       Get all users
    @route      GET api/users
    @access     Public
*/ 
exports.getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.apiFeatures);
});

/* 
    @desc       Get a single user
    @route      GET api/users/:id
    @access     Public
*/ 
exports.getUser = asyncHandler( async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if ( !user ) {
        return next( new AppError(`No user was found with an id of ${req.params.id}`), 404 );
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
        return next( new AppError(`No user was found with an id of ${req.params.id}`), 404 );
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
        return next( new AppError(`No user was found with an id of ${req.params.id}`), 404 );
    }

    user.remove();

    res.status(204).json({
        status: 'success',
        data: {}
    })
});
