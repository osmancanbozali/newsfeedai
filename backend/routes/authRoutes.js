const express = require('express');
const router = express.Router();
const { signup, login, logout, verifyToken } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', authMiddleware, logout);
router.get('/verifyToken', authMiddleware, verifyToken);

module.exports = router;