const { Storage } = require('@google-cloud/storage');
const News = require('../models/News');
const cron = require('node-cron');
const dotenv = require('dotenv');
dotenv.config();

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
const storage = new Storage({credentials: credentials});
const bucketName = process.env.GCS_BUCKET_NAME;
console.log('Bucket name:', bucketName);

async function deleteOldNews() {
    try {
        // Calculate the cutoff date (3 days ago)
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate());

        console.log("Cutoff date:", cutoffDate);

        // Find all news articles older than 3 days
        const oldNews = await News.find({
            publishedAt: { $lt: cutoffDate },
        }).exec();

        // Delete associated audio files from GCS bucket
        for (const news of oldNews) {
            try {
                if (news.audioUrl) {
                    console.log(`Deleting audio file from GCS: ${news.audioUrl}`);
                    // Extract the GCS file name from the audio URL
                    const fileName = news.audioUrl.split(`${bucketName}/`)[1];
                    if (fileName) {
                        const file = storage.bucket(bucketName).file(fileName);
                        await file.delete(); // Delete the file from the bucket
                        console.log(`Deleted audio file from GCS: ${fileName}`);
                    }
                }
            } catch (fileError) {
                console.error(`Error deleting file from GCS (${news.audioUrl}):`, fileError);
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