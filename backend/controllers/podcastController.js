const Podcast = require('../models/Podcast');
const User = require('../models/User');

exports.getPersonalizedPodcast = async (req, res) => {
    try {
        const userId = req.user._id; // Assume the user ID is available from JWT middleware
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const podcast = await Podcast.findOne({ user: userId });

        if (!podcast) {
            return res.status(404).json({ message: 'Podcast not found' });
        }

        res.status(200).json({ podcast });
    }
    catch (error) {
        console.error('Error fetching personalized podcast:', error.message);
        res.status(500).json({ error: 'Failed to fetch personalized podcast' });
    }
};

exports.trackPodcastListen = async (req, res) => {
    try {
        const userId = req.user._id; // Assume user ID is available from JWT middleware
        const { podcastId } = req.body; // Get podcast ID from request body

        // Find the user and podcast
        const user = await User.findById(userId);
        const podcast = await Podcast.findById(podcastId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!podcast) {
            return res.status(404).json({ message: 'Podcast not found' });
        }

        if (!podcast.isListened) {
            podcast.isListened = true;
            await podcast.save();
            res.status(200).json({ message: 'Podcast listen tracked successfully.' });
        }
        else {
            res.status(200).json({ message: 'Podcast already listened.' });
        }
    }
    catch (error) {
        console.error('Error tracking podcast listen:', error.message);
        res.status(500).json({ error: 'Failed to track podcast listen' });
    }
}