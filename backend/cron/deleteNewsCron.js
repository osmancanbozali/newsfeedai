const News = require('../models/News');
const fs = require('fs').promises;
const cron = require('node-cron');

async function deleteOldNews() {
    try {
        // Calculate the cutoff date (3 days ago)
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - 3);

        console.log("Cutoff date:", cutoffDate);

        // Find all news articles older than 3 days
        const oldNews = await News.find({
            publishedAt: { $lt: cutoffDate },
        }).exec();

        // Delete associated audio files
        for (const news of oldNews) {
            try {
                if (news.audioUrl) {
                    await fs.unlink(news.audioUrl); // Delete the audio file
                    console.log(`Deleted audio file: ${news.audioUrl}`);
                }
            } catch (fileError) {
                console.error(`Error deleting file ${news.audioUrl}:`, fileError);
            }
        }

        // Delete the old news articles from the database
        const result = await News.deleteMany({
            publishedAt: { $lt: cutoffDate },
        });

        console.log(`${result.deletedCount} old news articles deleted.`);
    } catch (error) {
        console.error('Error deleting old news:', error);
    }
}

const deleteNewsCron = cron.schedule('0 0 * * *', async () => { // Run every day at midnight
    console.log('Starting scheduled news deletation job');
    await deleteOldNews();
});

module.exports = deleteNewsCron;