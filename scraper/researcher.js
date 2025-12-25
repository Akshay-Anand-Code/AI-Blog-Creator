const axios = require('axios');
const cheerio = require('cheerio');
const googleIt = require('google-it');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const API_URL = process.env.LARAVEL_API_URL;

async function startProject() {
    try {
        console.log("Checking database...");
        let res = await axios.get(API_URL);
        
        if (res.data.length === 0) {
            console.log("Database empty. Starting Phase 1...");
            const { data } = await axios.get('https://beyondchats.com/blogs/');
            const $ = cheerio.load(data);
            
            const articlesFound = [];
            $('article').each((i, el) => {
                if (i < 5) {
                    articlesFound.push({
                        title: $(el).find('h2').text().trim(),
                        url: $(el).find('h2 a').attr('href'),
                        excerpt: "Original article content from BeyondChats."
                    });
                }
            });

            for (const art of articlesFound) {
                await axios.post(API_URL, art);
                console.log(`Stored: ${art.title}`);
            }
            res = await axios.get(API_URL);
        }

        const originalArticle = res.data[0]; 
        console.log(`Starting Phase 2 for: "${originalArticle.title}"`);

        const searchResults = await googleIt({ query: originalArticle.title });
        const topLinks = searchResults.slice(0, 2).map(r => r.link);

        let referenceContext = "";
        for (const link of topLinks) {
            try {
                console.log(`Reading: ${link}`);
                const { data } = await axios.get(link, { timeout: 5000 });
                const $ = cheerio.load(data);
                referenceContext += `\n--- SOURCE: ${link} ---\n${$('p').text().substring(0, 1000)}\n`;
            } catch (e) { 
                console.log(`Skipped link`); 
            }
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{
                role: "user",
                content: `Rewrite this article: "${originalArticle.title}" based on these references: ${referenceContext}. Cite the links at the bottom.`
            }]
        });

        const updatedContent = completion.choices[0].message.content;

        await axios.put(`${API_URL}/${originalArticle.id}`, {
            excerpt: updatedContent
        });

        console.log("Process complete");

    } catch (error) {
        console.error("Error:", error.message);
    }
}

startProject();