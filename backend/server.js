const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const newsRoutes = require('./routes/newsRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const podcastRoutes = require('./routes/podcastRoutes');

const fetchSummarizeVoiceNewsCron = require('./cron/fetchSummarizeVoiceNewsCron');
const generatePodcastsCron = require('./cron/podcastCron');
const deletePodcastsCron = require('./cron/deletePodcastsCron');
const deleteNewsCron = require('./cron/deleteNewsCron');

// Define the CORS options
const corsOptions = {
    credentials: true,
    origin: 'http://localhost:5173' // Whitelist the domains you want to allow
};

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Start the cron job
//fetchSummarizeVoiceNewsCron.start();
//generatePodcastsCron.start();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions)); // Use the cors middleware with your options

app.use('/audios', express.static(path.join(__dirname, 'audios')));

app.use('/news', newsRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/podcast', podcastRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});