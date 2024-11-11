const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastActivity: { type: Date, default: Date.now },
    interactedNews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'News' }],
    interactedCategories: {
        type: Map,
        of: Number,
        default: () => new Map([
            ['general', 0],
            ['world', 0],
            ['nation', 0],
            ['business', 0],
            ['technology', 0],
            ['entertainment', 0],
            ['sports', 0],
            ['science', 0]
        ])
    }
});

module.exports = mongoose.model('User', userSchema);