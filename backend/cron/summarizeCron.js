const axios = require('axios');

const getSummaryForNews = async () => {
    try {
        const response = await axios.post('http://localhost:3000/news/summarize');
        console.log('Summarization Response:', response.data);
    } catch (error) {
        console.error('Error in summarization request:', error.message);

    }
};

module.exports = { getSummaryForNews };