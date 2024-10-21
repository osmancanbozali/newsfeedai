const axios = require('axios');

const generateAudiosForNews = async () => {
    try {
        const response = await axios.post('http://localhost:3000/news/generate-audio');
        console.log('Audio-generation Response:', response.data);
    } catch (error) {
        console.error('Error in audio-generation request:', error.message);

    }
};

module.exports = { generateAudiosForNews };