const router = require("express").Router();
const reader = require("../model/reader");
const writer = require("../model/writer");
const bookmark = require("../model/bookmark");
const news = require("../model/news");

router.post("/register", async (req, res) => {
    try {
        const bookmarkInfo = bookmark({
            news: req.body.news,
            reader: req.body.reader,
        });
        await bookmarkInfo.save();
        res.send("Bookmarked")
    } catch (err) {
        res.status(400).send(err.message);
    }
});


router.post("/check", async (req, res)=>{
    try{
const bookmarkData = await bookmark.findOne({news:req.body.news})
if(bookmarkData){
    if(bookmarkData.reader == req.body.reader){
        res.send(true)
    }else{
        res.send(false);
    }

}else{
    res.send(false)
}
    }catch(err){
        res.status(400).send(err.message);
    }
})

router.post("/delete", async(req, res)=>{
    const readerID = req.body.reader;
    const newsID = req.body.news;
try{
const allBookmarkInfo = await bookmark.findOne({reader: readerID});
if(allBookmarkInfo){
const bookmarkInfo = await bookmark.findOne({news: newsID});
if(bookmarkInfo){
    const delBookmak = await bookmark.findByIdAndDelete(bookmarkInfo._id)
    if(delBookmak){
        res.send(true)
    }else{
    res.send(false)
    }
}else{
    res.send(false)
}
}else{
    res.send(false)
}
}catch(err){
    res.status(400).send(err.message)
}
})

router.post("/list", async (req, res) => {
    let returnData = [];
    var counter = 0;
    let bookmarkInfo = await bookmark.find({reader: req.body.reader})

    await bookmarkInfo.forEach(async (bookmark) => {
        let hey = {};
        let newsData = await news.findOne({_id: bookmark.news});
        let writerData = await writer.findOne({ _id: newsData.writer });
        hey._id = bookmark._id;
        hey.article = newsData.article;
        hey.headline = newsData.headline;
        hey.category = newsData.category;
        hey.date = newsData.date;
        hey.photoPath = newsData.photoPath;
        hey.keyword = newsData.keyword;
        hey.writerName = writerData.name;
        hey.writerPhoto = writerData.photoPath;
        hey.writerBio = writerData.bio;
        hey.writer = writerData._id;
        returnData.push(hey);
        counter++;
        if (counter == bookmarkInfo.length) {
            res.send(returnData);
        }
    });
});



module.exports = router;
