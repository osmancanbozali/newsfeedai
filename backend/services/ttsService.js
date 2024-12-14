const axios = require('axios');
const dotenv = require('dotenv');
const { Storage } = require('@google-cloud/storage');
dotenv.config();

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const storage = new Storage({
    credentials: credentials,
});

const bucketName = process.env.GCS_BUCKET_NAME;

const saveAudioFileToGCS = async (audioContent, filename) => {
    try {
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(`${filename}.mp3`);
        const binaryData = Buffer.from(audioContent, 'base64');

        // Upload the file to the bucket
        await file.save(binaryData, {
            contentType: 'audio/mpeg',
        });

        console.log(`Audio uploaded to: gs://${bucketName}/${filename}.mp3`);
        return `https://storage.googleapis.com/${bucketName}/${filename}.mp3`;
    } catch (error) {
        console.error('Error uploading file to Google Cloud Storage:', error.message);
        throw new Error('Failed to upload file to Google Cloud Storage');
    }
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

        const filepath = await saveAudioFileToGCS(audioContent, filename);
        return filepath;
    } catch (error) {
        console.error('Error generating audio:', error.response?.data || error.message);
        throw new Error('Failed to generate audio');
    }
}

module.exports = { generateAudio };