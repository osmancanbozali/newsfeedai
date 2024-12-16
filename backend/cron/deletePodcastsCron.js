const { Storage } = require('@google-cloud/storage');
const Podcast = require('../models/Podcast');
const cron = require('node-cron');
const dotenv = require('dotenv');
dotenv.config();

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
const storage = new Storage({credentials: credentials});
const bucketName = process.env.GCS_BUCKET_NAME;

// Function to delete all podcasts
async function deleteAllPodcasts() {
    try {
        const allPodcasts = await Podcast.find({}).exec();

        for (const podcast of allPodcasts) {
            try {
                if (podcast.podcastUrl) {
                    // Extract the GCS file name from the audio URL
                    const fileName = podcast.podcastUrl.split(`${bucketName}/`)[1];
                    if (fileName) {
                        const file = storage.bucket(bucketName).file(fileName);
                        await file.delete(); // Delete the file from the bucket
                        console.log(`Deleted audio file from GCS: ${fileName}`);
                    }
                }
            } catch (fileError) {
                console.error(`Error deleting file ${podcast.podcastUrl}:`, fileError);
            }
        }

        const result = await Podcast.deleteMany({});
        console.log(`${result.deletedCount} podcasts deleted.`);
    } catch (error) {
        console.error('Error deleting all podcasts:', error);
    }
}

const deletePodcastsCron = cron.schedule('15 0 * * *', async () => { // Run every day at 00:15
    console.log('Starting scheduled podcast deletation job');
    await deleteAllPodcasts();
});

module.exports = deletePodcastsCron;