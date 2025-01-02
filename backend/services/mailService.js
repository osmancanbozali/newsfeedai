const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

module.exports = transporter;