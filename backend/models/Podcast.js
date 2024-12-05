const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    newsArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'News' }],
    podcastUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Podcast', podcastSchema);