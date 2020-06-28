const express = require('express');
const { getProfiles,
        getProfile,
        addProfile,
        updateProfile,
        deleteProfile} = require('../controllers/profiles');
const { protect, authorize } = require('../middleware/auth');
const Profile = require('../models/Profile');
const apiFeatures = require('../middleware/apiFeatures');

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/')
    .get(apiFeatures(Profile, {
        path: 'user',
        select: 'firstname lastname'
    }), getProfiles)
    .post(authorize('user'), addProfile);

router.route('/:id')
    .get(getProfile)
    .put(authorize('user'), updateProfile)
    .delete(authorize('admin'), deleteProfile);

module.exports = router;