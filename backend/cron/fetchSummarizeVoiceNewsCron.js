const { fetchNewsFromAPI } = require('../services/newsService');
const { getSummary } = require('../services/OpenAIService');
const { generateAudio } = require('../services/ttsService');
const cron = require('node-cron');
const News = require('../models/News');

// Main function for fetching and processing news with a hybrid approach
const fetchSummarizeVoiceNews = async () => {
    try {
        const categories = ['general', 'world', 'nation', 'business', 'technology', 'entertainment', 'sports', 'science'];
        const amount = 20; // Number of news items to fetch per category in one API call

        for (const category of categories) {
            // Step 1: Fetch news articles from external API with a limit
            const newsBatch = await fetchNewsFromAPI(category, amount);

            // Step 2: Process each article one by one
            for (const articleData of newsBatch) {
                try {
                    console.log(`Processing article: ${articleData.title}`);
                    // Check if the article already exists in the database to avoid duplicates
                    let article = await News.findOne({ url: articleData.url });
                    if (!article) {
                        // Create a new article in the database
                        article = new News({
                            title: articleData.title,
                            content: articleData.content,
                            source: articleData.source.name,
                            category,
                            publishedAt: articleData.publishedAt,
                            url: articleData.url,
                        });
                        await article.save();
                    }
                    // Summarize the article if it doesn't have a summary
                    if (!article.summary) {
                        article.summary = await getSummary(article.content);
                        await article.save(); // Save the article with its summary
                    }
                    console.log(`Summarized: ${article.title}`);

                    // Generate audio for the summary if it doesn't have an audio URL
                    if (!article.audioUrl && article.summary) {
                        article.audioUrl = await generateAudio(article.summary, article._id.toString());
                        await article.save(); // Save the article with its audio URL
                    }
                    console.log(`Audio generated for: ${article.title}`);

                    // Set isReady to true if both summary and audio are available
                    if (article.summary && article.audioUrl) {
                        article.isReady = true;
                        await article.save();
                    }

                } catch (error) {
                    console.error(`Error processing article (${articleData.url}):`, error.message);
                }
            }
        }

        console.log('Hybrid processing of news completed');
    } catch (error) {
        console.error('Error in hybrid news processing:', error.message);
    }
};

// Schedule to run every 2 hours
const fetchSummarizeVoiceNewsCron = cron.schedule('*/15 * * * *', async () => { // Run every 15 minutes
    console.log('Starting scheduled news processing job');
    await fetchSummarizeVoiceNews();
});

module.exports = fetchSummarizeVoiceNewsCron;