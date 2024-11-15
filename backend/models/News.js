const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    summary: {type: String}, // OpenAI API generated
    source: {type: String, required: true},
    category: {type: String, required: true},
    publishedAt: {type: Date, required: true},
    url: {type: String, required: true},
    audioUrl: {type: String}, // TTS API generated
    isReady: { type: Boolean, default: false }, // Indicates if summary and audio are completed
    clickCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('News', newsSchema);