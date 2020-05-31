const express = require('express');
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/users');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(getUsers)
    .post(protect, authorize('publisher', 'admin'), createUser);

router.route('/:id')
    .get(getUser)
    .put(protect, authorize('publisher', 'admin'), updateUser)
    .delete(protect, authorize('publisher', 'admin'), deleteUser);

module.exports = router;