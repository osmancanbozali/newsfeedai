const express = require('express');
const router = express.Router();
const { signup, login, logout, verifyToken, verifyEmail, forgotPassword, resetPassword } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/verifyEmail', verifyEmail);
router.get('/logout', authMiddleware, logout);
router.get('/verifyToken', authMiddleware, verifyToken);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);

module.exports = router;