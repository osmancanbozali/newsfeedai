const { OpenAI } = require('openai');
const dotenv = require('dotenv');
const { get } = require('mongoose');

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const getSummary = async (content, sentenceCount = 5) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: `You are a news summarizator, your job is to summarize the given news text to maximum ${sentenceCount} sentences.` },
                {
                    role: "user",
                    content: content,
                },
            ],
        });
        const summary = response.choices[0].message.content;
        return summary;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

const getPodcastText = async (content) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: `You are a podcast generator, your job is to generate a podcast with last days news. I will provide the yesterdays most clicked news in my system as summarized with categories use those summaries directly, do not change them, what you will do is to create a podcast text to voice. Make it a personal podcast the news are selected according to a unique persons preferences so start with a phrase like 'Welcome to your personal daily news podcast'. Also do not use any non alphebetical characters since the message will be voiced` },
                {
                    role: "user",
                    content: content,
                },
            ],
        });
        const summary = response.choices[0].message.content;
        return summary;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

module.exports = {getSummary, getPodcastText};