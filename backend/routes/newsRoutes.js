const express = require('express');
const router = express.Router();
const {createNews, summarizeNews, generateAudioForNews} = require('../controllers/newsController');

// Route to create a new news
router.post('/', createNews);
router.post('/summarize', summarizeNews);
router.post('/generate-audio', generateAudioForNews);
module.exports = router;