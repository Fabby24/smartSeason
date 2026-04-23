const express = require('express');
const { login, signup, getMe, getAllUsers } = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/me', protect, getMe);
router.get('/users', protect, adminOnly, getAllUsers);

module.exports = router;