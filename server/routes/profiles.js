const express = require('express');
const { getProfiles, getProfile, addProfile, updateProfile, deleteProfile } = require('../controllers/profiles');
const { protect, authorize } = require('../middleware/auth');
const Profile = require('../models/Profile');
const apiFeatures = require('../middleware/apiFeatures');

const router = express.Router({ mergeParams: true });

//router.use(protect);
//router.use(authorize('user'));

router.route('/')
    .get(apiFeatures(Profile, {
        path: 'user',
        select: 'jobtitle'
    }), getProfiles)
    .post(addProfile);

router.route('/:id')
    .get(getProfile)
    .put(updateProfile)
    .delete(deleteProfile);

module.exports = router;