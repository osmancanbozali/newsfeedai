const News = require('../models/News');
const User = require('../models/User');
const { getSummary } = require('../services/summarizeService');
const { generateAudio } = require('../services/ttsService');

exports.createNews = async (req, res) => {
  try {
    const newsArray = req.body; // Expecting an array of news objects

    if (!Array.isArray(newsArray)) {
      return res.status(400).json({ error: 'Request body must be an array of news objects.' });
    }

    const savedNews = await News.insertMany(
      newsArray.map(article => ({
        title: article.title,
        content: article.content,
        source: article.source.name,
        category: article.category,
        publishedAt: article.publishedAt,
        url: article.url
      }))
    );

    res.status(201).json({ message: 'News articles saved successfully.', savedNews });
  } catch (error) {
    console.error('Error saving news articles:', error);
    res.status(500).json({ error: `${error}` });
  }
};


exports.summarizeNews = async (req, res) => {
  try {
    const unsummarizedNews = await News.find({ summary: { $exists: false } }); // Find unsummarized news

    for (const article of unsummarizedNews) {
      const summary = await getSummary(article.content); // Generate summary
      article.summary = summary; // Update article with summary
      await article.save(); // Save updated article
      console.log(`Summarized: ${article.title}`);
    }
    res.status(200).json({ message: 'All unsummarized news articles have been summarized.' });
  } catch (error) {
    console.error('Error summarizing news:', error);
    res.status(500).json({ error: `${error.message}` });
  }
};


exports.generateAudioForNews = async (req, res) => {
  try {
    const summarizedNews = await News.find({ summary: { $exists: true }, audioUrl: { $exists: false } });

    for (const article of summarizedNews) {
      const filename = `${article._id}`;
      const audioPath = await generateAudio(article.summary, filename); // Generate audio
      article.audioUrl = audioPath; // Save the audio URL to the article
      await article.save();
      console.log(`Audio generated for: ${article.title}`);
    }

    res.status(200).json({ message: 'Audio files generated successfully.' });
  } catch (error) {
    console.error('Error generating audio files:', error);
    res.status(500).json({ error: `${error.message}` });
  }
};

// Temporary endpoint for getting all the news
exports.getNews = async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Endpoint for fetching personalized news feed with pagination
exports.getPersonalizedFeed = async (req, res) => {
  try {
    const userId = req.user._id; // Assume the user ID is available from JWT middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const limit = 20; // Fixed limit for the total number of articles per page
    const page = parseInt(req.query.page) || 1;

    // Calculate total interaction count across all categories
    const totalInteractions = Array.from(user.interactedCategories.values()).reduce((sum, count) => sum + count, 0);

    // Scale each category's interaction count to get the number of articles to fetch per category
    const categoryArticleCounts = {};
    for (const [category, count] of user.interactedCategories.entries()) {
      categoryArticleCounts[category] = Math.round((count / totalInteractions) * limit);
    }

    // Adjust for rounding errors to ensure the total matches the limit
    let totalAssigned = Object.values(categoryArticleCounts).reduce((sum, count) => sum + count, 0);
    if (totalAssigned !== limit) {
      const adjustment = limit - totalAssigned;
      const categories = Object.keys(categoryArticleCounts);
      categoryArticleCounts[categories[0]] += adjustment; // Adjust the first category to match the total limit
    }

    // Fetch articles for each category according to the calculated count and apply pagination
    const newsFeed = [];
    for (const [category, count] of Object.entries(categoryArticleCounts)) {
      if (count > 0) {
        const categorySkip = (page - 1) * count; // Skip based on the weighted count for pagination
        const articles = await News.find({ category })
          .sort({ publishedAt: -1 })
          .skip(categorySkip) // Skip articles based on the calculated skip for this category
          .limit(count); // Limit articles per category
        newsFeed.push(...articles);
      }
    }

    // Sort all fetched articles by publish date in descending order
    newsFeed.sort((a, b) => b.publishedAt - a.publishedAt);

    res.status(200).json({
      page,
      limit,
      totalArticles: newsFeed.length,
      personalizedNews: newsFeed,
    });
  } catch (error) {
    console.error('Error fetching personalized feed:', error.message);
    res.status(500).json({ error: 'Failed to fetch personalized feed' });
  }
};

// Endpoint for fetching news by category with pagination
exports.getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = 20; // Fixed limit of 20 articles per page
    const skip = (page - 1) * limit;

    // Fetch news articles for the specified category with pagination
    const newsArticles = await News.find({ category })
      .sort({ publishedAt: -1 }) // Sort by publish date in descending order
      .skip(skip) // Skip articles based on page number
      .limit(limit); // Fixed limit of 20 articles per page

    // Get the total count of articles in this category for pagination metadata
    const totalArticles = await News.countDocuments({ category });
    const totalPages = Math.ceil(totalArticles / limit);

    res.status(200).json({
      page,
      limit,
      totalArticles,
      totalPages,
      newsArticles,
    });
  } catch (error) {
    console.error('Error fetching news by category:', error.message);
    res.status(500).json({ error: 'Failed to fetch news by category' });
  }
};

// Endpoint for tracking user clicks on news articles
exports.trackNewsClick = async (req, res) => {
  try {
    const userId = req.user._id; // Assume user ID is available from JWT middleware
    const { newsId } = req.body; // Get news article ID from request body

    // Find the user and news article
    const user = await User.findById(userId);
    const news = await News.findById(newsId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }

    // Check if the news article is already in interactedNews
    if (!user.interactedNews.includes(newsId)) {
      // Add the news article to the user's interactedNews array
      user.interactedNews.push(newsId);

      // Increment the category count in interactedCategories
      const category = news.category;
      if (!user.interactedCategories.has(category)) {
        user.interactedCategories.set(category, 1);
      } else {
        user.interactedCategories.set(category, user.interactedCategories.get(category) + 1);
      }

      // Save the updated user
      await user.save();

      res.status(200).json({ message: 'News click tracked successfully.' });
    } else {
      // If article is already in interactedNews, do not update interactedCategories
      res.status(200).json({ message: 'News article already tracked.' });
    }
  } catch (error) {
    console.error('Error tracking news click:', error.message);
    res.status(500).json({ error: 'Failed to track news click' });
  }
};