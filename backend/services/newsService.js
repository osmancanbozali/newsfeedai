const axios = require('axios');

// category, max, lang, expand, from, to, country???
const fetchNewsFromAPI = async (category,newsCount) => {
    try {
        const response = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${process.env.GNEWS_API_KEY}&lang=en&max=${newsCount}&expand=content`);
        return response.data.articles;
    } catch (error) {
        console.error('Error fetching news from API:', error);
        throw new Error('Failed to fetch news');
    }
};

module.exports = { fetchNewsFromAPI };