const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Endpoint for updating user's full name
exports.updateFullName = async (req, res) => {
    try {
        const userId = req.user._id; // Assume user ID is available from JWT middleware
        const { fullname } = req.body;

        if (!fullname) {
            return res.status(400).json({ message: 'Full name is required.' });
        }

        const user = await User.findByIdAndUpdate(userId, { fullname }, { new: true });

        res.status(200).json({
            message: 'Full name updated successfully.',
            user: { fullname: user.fullname }
        });
    } catch (error) {
        console.error('Error updating full name:', error.message);
        res.status(500).json({ error: 'Failed to update full name.' });
    }
};

// Endpoint for updating user's password
exports.updatePassword = async (req, res) => {
    try {
        const userId = req.user._id; // Assume user ID is available from JWT middleware
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Current and new passwords are required.' });
        }

        const user = await User.findById(userId);

        // Verify the current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect.' });
        }

        // Hash the new password and update it
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        console.error('Error updating password:', error.message);
        res.status(500).json({ error: 'Failed to update password.' });
    }
};

// Endpoint for resetting user's preferences
exports.resetPreferences = async (req, res) => {
    try {
        const userId = req.user._id; // Assume user ID is available from JWT middleware

        const user = await User.findById(userId);

        // Clear interacted news and reset category interactions
        user.interactedNews = [];
        user.interactedCategories = new Map([
            ['general', 0],
            ['world', 0],
            ['nation', 0],
            ['business', 0],
            ['technology', 0],
            ['entertainment', 0],
            ['sports', 0],
            ['science', 0]
        ]);

        await user.save();

        res.status(200).json({ message: 'Preferences reset successfully.' });
    } catch (error) {
        console.error('Error resetting preferences:', error.message);
        res.status(500).json({ error: 'Failed to reset preferences.' });
    }
};