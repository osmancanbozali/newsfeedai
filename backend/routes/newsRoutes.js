const express = require('express');
const router = express.Router();
const {createNews, summarizeNews, generateAudioForNews} = require('../controllers/newsController');

// Routes
router.post('/', createNews);
router.post('/summarize', summarizeNews);
router.post('/generate-audio', generateAudioForNews);
module.exports = router;