const { getCyberSecurityNews } = require('../utils/newsapi_client');
const { getArticles } = require('../utils/newscatcher_client');
const  Article  = require('../models/article');
const router = require('express').Router();

router.get('/get',(req,res)=>{
    const page = req.query.page || 1;
    const pageSize = req.query.page_size || 100;
    const skip = (page-1)*pageSize;
    Article.find().sort({publishedDate:-1}).skip(skip).limit(pageSize).then(articles=>{
        res.json(articles);
    }).catch(err=>{res.status(400).json(err);});
});

router.get('/get_all', async (req, res) => {
    const articles = await Article.find();
    res.json(articles);
});

router.get('/search', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.page_size) || 100;
        const skip = (page - 1) * pageSize;
        const query = req.query.q;

        if (!query) {return res.status(400).json({ message: "Query parameter 'q' is required." });}

        const regex = new RegExp(query, "i"); // "i" makes the search case-insensitive
        const articles = await Article.find({$or: [{ title: { $regex: regex } }, { description: { $regex: regex } }]}).skip(skip).limit(pageSize);
        res.json(articles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while searching." });
    }
});

router.get('/latest', (req,res)=>{
    const page = req.query.page || 1;
    const pageSize = req.query.page_size || 100;
    const skip = (page-1)*pageSize;
    Article.find().sort({publishedDate:-1}).skip(skip).limit(pageSize).then(articles=>{
        res.json(articles);
    }).catch(err=>{res.status(400).json(err);});
});

router.get('/get_one',(req,res)=>{
    Article.findById(req.query.id).then(article=>{
        res.json(article);
    }).catch(err=>{res.status(400).json(err);});
});

router.get('/newsapi', async (req, res) => {
    const articles = await getCyberSecurityNews();
    articles.forEach(article=>{
        Article.create(article).then(res=>console.log(res)).catch(err=>console.log(err));
    });
    res.json({message: "Articles successfully added to database"});
});

router.get('/newscatcher', async (req, res) => {
    const page = req.query.page || 1;
    const pageSize = req.query.page_size || 100;
    const from = req.query.from || 'yesterday';
    const to = req.query.to || 'now';
    const sortBy = req.query.sort_by || 'relevancy';
    const data = await getArticles(page,pageSize,from,to,sortBy);
    const articles = data?.articles;
    articles?.forEach(article=> {
        if(article._score<20){
            return;
        }
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
        articleObj.relevance_score = article._score;
        Article.create(articleObj).then(res=>console.log(res)).catch(err=>console.log(err));
    });
    res.json(data);
});

module.exports = router;
