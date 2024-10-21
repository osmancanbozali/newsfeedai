const News = require('../models/News');
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