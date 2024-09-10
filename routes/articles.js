const { getCyberSecurityNews } = require('../utils/newsapi_client');
const { getArticles } = require('../utils/newscatcher_client');
const  Article  = require('../models/article');

const router = require('express').Router();

router.get('/get',(req,res)=>{
    Article.find().limit(100).then(articles=>{
        res.json(articles);
    }).catch(err=>{res.status(400).json(err);});
})
router.get('/get_all', async (req, res) => {
    const articles = await Article.find();
    res.json(articles);
});

// router.get('/search')

router.get('/newsapi', async (req, res) => {
    const articles = await getCyberSecurityNews();
    articles.forEach(article=>{
        Article.create(article).then(res=>console.log(res)).catch(err=>console.log(err));
    })
    res.json({message: "Articles successfully added to database"});
});

router.get('/newscatcher', async (req, res) => {
    const page = req.query.page || 1;
    const pageSize = req.query.page_size || 100;
    const articles = await getArticles(page,pageSize);
    articles?.forEach(article=> {
        const articleObj = {};
        articleObj.title = article.title;
        articleObj.source = article.clean_url;
        articleObj.summary = article.summary;
        articleObj.url = article.link;
        articleObj.media = article.media;
        articleObj.publishedDate = article.published_date;
        articleObj.author = article.author;
        articleObj.country = article.country;
        articleObj.language = article.language;
        articleObj.description = article.excerpt;
        Article.create(articleObj).then(res=>console.log(res)).catch(err=>console.log(err));
    });
    res.json({message: "Articles successfully added to database"})
});

module.exports = router;
