const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { fullname, email, password, confirmPassword } = req.body;
        console.log(req.body);
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

        const user = new User({ fullname, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
        console.log(token);
        const frontendURL = new URL(process.env.FRONTEND_URL || 'http://localhost').hostname;
        const formattedURL = frontendURL.startsWith('.') ? frontendURL : `.${frontendURL}`;
        res.cookie('accessToken', token, {
            domain: formattedURL,
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 120 * 60 * 1000, //120 * 60 * 1000
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