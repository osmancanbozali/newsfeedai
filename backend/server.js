const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const newsRoutes = require('./routes/newsRoutes');

const { getSummaryForNews } = require('./cron/summarizeCron');
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

app.use('/news', newsRoutes);

// Simple route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const deneme = async () => {
    await getSummaryForNews();
}
deneme();

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});