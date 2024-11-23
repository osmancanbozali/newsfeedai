const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const newsRoutes = require('./routes/newsRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

//const fetchSummarizeVoiceNewsCron = require('./cron/fetchSummarizeVoiceNewsCron');
const generatePodcastsCron = require('./cron/podcastCron');

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

app.use('/news', newsRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});