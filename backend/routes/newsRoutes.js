const express = require('express');
const router = express.Router();
const {createNews, summarizeNews, generateAudioForNews, getNews, getPersonalizedFeed, getNewsByCategory, trackNewsClick} = require('../controllers/newsController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.get('/', authMiddleware, getNews);
router.post('/', createNews);
router.post('/summarize', summarizeNews);
router.post('/generate-audio', generateAudioForNews);
router.get('/feed', authMiddleware, getPersonalizedFeed);
router.get('/category/:category', getNewsByCategory);
router.post('/click', authMiddleware, trackNewsClick);
module.exports = router;