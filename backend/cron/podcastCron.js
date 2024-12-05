const cron = require('node-cron');
const User = require('../models/User');
const News = require('../models/News');
const Podcast = require('../models/Podcast');
const { getSummary, getPodcastText } = require('../services/OpenAIService');
const { generateAudio } = require('../services/ttsService');

// Function to generate personalized podcasts
const generatePodcasts = async () => {
    try {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        const activeUsers = await User.find({ lastActivity: { $gte: threeDaysAgo } });

        if (!activeUsers.length) {
            console.log('No active users found.');
            return;
        }

        // Get most clicked 20 news from last day for each category
        const categories = ['general', 'world', 'nation', 'business', 'technology', 'entertainment', 'sports', 'science'];

        const results = await Promise.all(
            categories.map(async (category) => {
                const now = new Date();
                const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const startOfYesterday = new Date(startOfToday);
                startOfYesterday.setDate(startOfYesterday.getDate() -1 ); // Midnight of the day before today
                const endOfYesterday = new Date(startOfToday + 1); // Midnight of today

                console.log(`Fetching top news for ${category} from ${startOfYesterday} to ${endOfYesterday}`);
        
                return await News.aggregate([
                    {
                        $match: {
                            category, // Match news in the specific category
                            creationDate: { $gte: startOfYesterday, $lt: endOfYesterday }, // Only "yesterday's" news
                        },
                    },
                    { $sort: { clickedCount: -1 } }, // Sort by clickedCount in descending order
                    { $limit: 20 }, // Limit to top 20 articles
                ]);
            })
        );
        
        const topNewsByCategory = categories.reduce((acc, category, index) => {
            acc[category] = results[index];
            return acc;
        }, {});

        //create new summaries for each news article
        const summaries = await Promise.all(
            categories.map(async (category) => {
                return await Promise.all(
                    topNewsByCategory[category].map(async (news) => {
                        const summary = await getSummary(news.content, 3);
                        return { ...news, shortSummary: summary };
                    })
                );
            })
        );

        // Generate podcasts for each user
        for (const user of activeUsers) {
            // Calculate total interaction count across all categories
            const totalInteractions = Array.from(user.interactedCategories.values()).reduce((sum, count) => sum + count, 0);

            // Scale each category's interaction count to get the number of articles to fetch per category
            const categoryArticleCounts = {};
            for (const [category, count] of user.interactedCategories.entries()) {
                categoryArticleCounts[category] = Math.round((count / totalInteractions) * 16);
            }

            // Adjust for rounding errors to ensure the total matches the limit
            let totalAssigned = Object.values(categoryArticleCounts).reduce((sum, count) => sum + count, 0);
            if (totalAssigned !== 16) {
                const adjustment = 16 - totalAssigned;
                const mostClickedCategory = Object.keys(categoryArticleCounts).reduce((a, b) => categoryArticleCounts[a] >= categoryArticleCounts[b] ? a : b);
                categoryArticleCounts[mostClickedCategory] += adjustment; // Adjust the first category to match the total limit
            }

            // Fetch articles for each category according to the calculated count
            const podcastNews = [];
            for (const [category, count] of Object.entries(categoryArticleCounts)) {
                if (count > 0) {
                    const articles = summaries[categories.indexOf(category)].slice(0, count);
                    podcastNews.push(...articles);
                }
            }

            // Generate podcast text
            const podcastData = podcastNews.map((news) => {
                return {
                    title: news.title,
                    shortSummary: news.shortSummary,
                    category: news.category,
                };
            }
            );
            const podcastText = await getPodcastText(JSON.stringify(podcastData));

            // Generate podcast audio
            let podcastUrl = '';
            try {
                const podcastFilename = `podcast_${user._id}_${Date.now()}`;
                podcastUrl = await generateAudio(podcastText, podcastFilename);
            } catch (error) {
                console.error(`TTS API failed for user ${user.email}:`, error.response?.data || error.message);
                continue; // Skip to the next user
            }

            // Save podcast to the database
            const podcast = new Podcast({
                user: user._id,
                newsArticles: podcastNews.map(article => article._id),
                podcastUrl,
            });
            await podcast.save();
            console.log(`Podcast generated for user ${user.email}`);

        }

        console.log('Podcasts generated successfully');
    } catch (error) {
        console.error('Error generating podcasts:', error.message);
    }
};

const generatePodcastsCron = cron.schedule('30 0 * * *', async () => { // Run every day at midnight at 00:30
    console.log('Starting scheduled podcast generation job');
    await generatePodcasts();
});

module.exports = generatePodcastsCron;
