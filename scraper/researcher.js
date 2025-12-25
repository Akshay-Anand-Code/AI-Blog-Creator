const axios = require('axios');
const cheerio = require('cheerio');
const googleIt = require('google-it');
require('dotenv').config();

const API_URL = process.env.LARAVEL_API_URL;

async function runPhase2() {
    try {
        const res = await axios.get(API_URL);
        const articles = res.data;
        if (articles.length === 0) return;
        const originalArticle = articles[0];

        const searchResults = await googleIt({ query: originalArticle.title });
        const topLinks = searchResults.slice(0, 2).map(r => r.link);

        let referenceContext = "";
        for (const link of topLinks) {
            try {
                const { data } = await axios.get(link, { timeout: 5000 });
                const $ = cheerio.load(data);
                const text = $('p').text().substring(0, 1500);
                referenceContext += `\n--- SOURCE: ${link} ---\n${text}\n`;
            } catch (e) {
                continue;
            }
        }

    } catch (error) {
        console.error(error.message);
    }
}

runPhase2();