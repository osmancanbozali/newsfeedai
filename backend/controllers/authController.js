const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../services/mailService');

exports.signup = async (req, res) => {
    try {
        const { fullname, email, password, confirmPassword } = req.body;
        if (!fullname || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10) // second parameter might be changed

        const user = new User({ fullname, email, password: hashedPassword, isVerified: false });
        await user.save();

        const token = jwt.sign({ email }, process.env.JWT_EMAIL_SECRET, { expiresIn: "1d" });
        const url = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${token}`;

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Verify your email',
            html: `<h1>Click <a href="${url}">here</a> to verify your email.</h1>`,
        });

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ message: 'Invalid token.' });
        }

        const { email } = jwt.verify(token, process.env.JWT_EMAIL_SECRET);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }

        user.isVerified = true;
        await user.save();
        res.status(200).json({ message: 'Email verified successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid email or password. Please try again.' });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: "Email not verified. Please check your inbox." });
        }

        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '8h' });
        console.log(token);
        const frontendURL = new URL(process.env.FRONTEND_URL || 'http://localhost').hostname;
        const formattedURL = frontendURL.startsWith('.') ? frontendURL : `.${frontendURL}`;
        res.cookie('accessToken', token, {
            domain: formattedURL,
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 8 * 60 * 60 * 1000, // 8 hours
        });
        res.status(200).json({ message: 'User logged in successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.verifyToken = (req, res) => {
    res.status(200).json({ message: 'User authenticated successfully.' });
};

exports.logout = (req, res) => {
    const frontendURL = new URL(process.env.FRONTEND_URL || 'http://localhost').hostname;
    const formattedURL = frontendURL.startsWith('.') ? frontendURL : `.${frontendURL}`;
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        domain: process.env.FRONTEND_URL ? new URL(process.env.FRONTEND_URL).hostname : undefined,
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User with this email can not found.' });
        }

        const token = jwt.sign({ email }, process.env.JWT_EMAIL_SECRET, { expiresIn: '1h' });
        const url = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${token}`;

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Reset your password',
            html: `<h1>Click <a href="${url}">here</a> to reset your password.</h1>`,
        });

        res.status(200).json({ message: 'Password reset link sent to your email.' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.query;
        const { password, confirmPassword } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Invalid token.' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }

        const { email } = jwt.verify(token, process.env.JWT_EMAIL_SECRET);
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully.' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};