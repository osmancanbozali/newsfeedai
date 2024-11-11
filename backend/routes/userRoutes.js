const express = require('express');
const router = express.Router();
const { updateFullName, updatePassword, resetPreferences } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to update full name
router.post('/update-name', authMiddleware, updateFullName);

// Route to update password
router.post('/update-password', authMiddleware, updatePassword);

// Route to reset preferences
router.post('/reset-preferences', authMiddleware, resetPreferences);

module.exports = router;