const router = require('express').Router();
const news = require('../model/news');

router.post('/register', async(req, res) => {
    //Validation


    //create new news
    const newsInfo = news({
        category: req.body.category,
        headline: req.body.headline,
        article:req.body.article,
        date:req.body.date,
        keyword:req.body.keyword,
        photoPath:req.body.photoPath,
        views: req.body.views,
        up:req.body.up,
        down:req.body.down,
        writer:req.body._id,

    });
    try{
        await newsInfo.save(); 
        res.send("News Added"); 
    }catch(error){
        res.status(400).send(error.message)
    }
})

router.get('/list',async (req, res) =>{
    
    const newsData = await news.find()
       res.send(newsData);
    
})


module.exports = router;