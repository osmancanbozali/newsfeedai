const express = require('express');
const router = express.Router();
const {createNews, summarizeNews} = require('../controllers/newsController');

// Route to create a new news
router.post('/', createNews);
router.post('/summarize', summarizeNews);
module.exports = router;