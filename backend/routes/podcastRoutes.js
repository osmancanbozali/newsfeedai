const express = require('express');
const router = express.Router();
const { getPersonalizedPodcast, trackPodcastListen } = require('../controllers/podcastController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to get personalized podcast
router.get('/today', authMiddleware, getPersonalizedPodcast);

// Route to track podcast listen
router.post('/listened', authMiddleware, trackPodcastListen);

module.exports = router;