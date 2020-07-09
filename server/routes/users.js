const express = require('express');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    updatePhoto,
    uploadUserPhoto,
    resizePhoto,
    uploadUserDocument,
    resizeDocuments,
    updateDocs
} = require('../controllers/users');
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');
const apiFeatures = require('../middleware/apiFeatures');

const router = express.Router();

// Include the profile router
const profileRouter = require('./profiles');

// Re-route into the profile router
router.use('/:userId/profiles', profileRouter);

router.use(protect);
// router.use(authorize('admin'));

router.patch('/:id/updatePhoto', uploadUserPhoto, resizePhoto, updatePhoto);
router.patch('/:id/updateDoc', uploadUserDocument, resizeDocuments, updateDocs)

router
    .route('/')
    .get(apiFeatures(User, 'user_profile'), getUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(authorize('admin'), deleteUser);

module.exports = router;
