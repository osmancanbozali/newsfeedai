const axios = require('axios');
const { fetchNewsFromAPI } = require('../services/newsService');

// Helper function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchAndSaveNews = async () => {
    const categories = ['general', 'world', 'nation', 'business', 'technology', 'entertainment', 'sports', 'science', 'technology'];
    try {
        for (category of categories) {
            const articles = await fetchNewsFromAPI(category, 5);
            articles.map((article) => article["category"] = category);

            await axios.post('http://localhost:3000/news', articles);
            console.log(`News save for ${category} category!!`);
            await delay(1000);
        }
        console.log('News successfully saved.');
    } catch (error) {
        console.error('Error saving news:', error);
    }
}

module.exports = { fetchAndSaveNews };