const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const AppError = require('../utils/appError');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    if ( file.mimetype.startsWith('image') ) {
        cb(null, true);
    }
    else {
        cb(new AppError('Please upload only images'), 400, false);
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
        .toFile(`public/profiles/${req.file.filename}`);

    next();
});

/* 
    @desc       Upload a user photo
    @route      PUT api/users/:id/photo
    @access     Private
*/ 
exports.updateMe = asyncHandler( async(req, res, next) => {
    if ( req.file ) {
        const url = `${req.protocol}://${req.get('host')}`;
        req.body.photo = `${url}/public/profiles/${req.file.filename}`;
        // req.body.documents = 
    }

    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true
    });
    
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
    @access     Private/Admin
*/ 
exports.getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.apiFeatures);
});

/* 
    @desc       Get a single user
    @route      GET api/users/:id
    @access     Private/Admin
*/ 
exports.getUser = asyncHandler( async(req, res, next) => {
    const user = await User.findById(req.params.id).populate('user_profile');
    
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
    @access     Private/Admin
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
    @access     Private/Admin
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
    @access     Private/Admin
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
