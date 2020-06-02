const express = require('express');
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/users');
const { protect, authorize } = require('../middleware/auth');

// Include the profile router
const profileRouter = require('./profiles');

const router = express.Router();

// Re-route into the profile router
router.use('/:userId/profiles', profileRouter);

router.use(protect);
router.use(authorize('admin'))

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;