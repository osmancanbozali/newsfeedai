const fs = require('fs');
const util = require('util');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// Save the audio content to a file
const saveAudioFile = async (audioContent, filename) => {
    const writeFile = util.promisify(fs.writeFile);
    const filepath = `./audios/${filename}.mp3`;
    const binaryData = Buffer.from(audioContent, 'base64');
    await writeFile(filepath, binaryData, 'binary');
    console.log(`Audio saved to: ${filepath}`);
    return filepath;
};

const generateAudio = async (text, filename) => {
    try {
        const response = await axios.post(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_API_KEY}`,
            {
                input: { text: text },
                voice: { languageCode: 'en-US', name: 'en-US-News-L' },
                audioConfig: { audioEncoding: 'MP3' },
            }
        );

        const audioContent = response.data.audioContent;
        if (!audioContent) {
            throw new Error('No audio content returned from Google TTS API');
        }

        const filepath = await saveAudioFile(audioContent, filename);
        return filepath;
    } catch (error) {
        console.error('Error generating audio:', error.response?.data || error.message);
        throw new Error('Failed to generate audio');
    }
}

module.exports = { generateAudio };