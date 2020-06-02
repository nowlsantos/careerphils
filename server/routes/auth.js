const express = require('express');
const { register, login, getMe, forgotPassword } = require('../controllers/auth');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, authorize('admin'), getMe);
router.post('/forgotpassword', forgotPassword);

module.exports = router;