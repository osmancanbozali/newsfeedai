const { OpenAI } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const getSummary = async (content) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a news summarizator, your job is to summarize the given news text to maximum 5 sentences." },
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

module.exports = {getSummary};