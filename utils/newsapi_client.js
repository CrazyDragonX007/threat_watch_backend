const {newsapi_key} = require("./config")
const NewsAPI = require('newsapi');
const axios = require("axios");
const {JSDOM} = require("jsdom");
const {Readability} = require("@mozilla/readability");

const newsapi = new NewsAPI(newsapi_key);

const getCyberSecurityNews = async () => {
    try {
        const res =  await newsapi.v2.everything({
            q: 'Cybersecurity OR Information Security OR Data Privacy OR Malware OR Phishing OR Ransomware OR Data Breach OR Encryption OR Network Security OR Hacking',
            language: 'en',
            sortBy: 'publishedAt',
            searchIn: 'title',
            page:1
        });
        // const article = await getFullArticle(res?.articles[0].url)
        return res.articles;
    } catch (error) {
        console.error(error)
    }
}

const getFullArticle = async (url) => {
    try {
        return await axios.get(url).then(function (res) {
            // We now have the article HTML, but before we can use Readability to locate the article content we need jsdom to convert it into a DOM object
            let dom = new JSDOM(res.data, { url: url });
            // now pass the DOM document into readability to parse
            let article = new Readability(dom.window.document).parse();
            // Done! The article content is in the textContent property
            console.log(article);
            return article;
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports = {getCyberSecurityNews};
