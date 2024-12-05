const Podcast = require('../models/Podcast');
const fs = require('fs').promises; // Use the promise-based API for file system operations
const cron = require('node-cron');

async function deleteAllPodcasts() {
    try {
        const allPodcasts = await Podcast.find({}).exec();

        for (const podcast of allPodcasts) {
            try {
                if (podcast.podcastUrl) {
                    await fs.unlink(podcast.podcastUrl); // Delete the file
                    console.log(`Deleted file: ${podcast.podcastUrl}`);
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

const deletePodcastsCron = cron.schedule('0 0 * * *', async () => { // Run every day at midnight
    console.log('Starting scheduled podcast deletation job');
    await deleteAllPodcasts();
});

module.exports = deletePodcastsCron;
