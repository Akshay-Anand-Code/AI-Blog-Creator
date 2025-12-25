const axios = require('axios');
require('dotenv').config();

const API_URL = process.env.LARAVEL_API_URL;

async function runPhase2() {
    try {
        const res = await axios.get(API_URL);
        const articles = res.data;
        
        if (articles.length === 0) return;
        
        const originalArticle = articles[0];
        console.log(`Processing: ${originalArticle.title}`);

    } catch (error) {
        console.error(error.message);
    }
}

runPhase2();