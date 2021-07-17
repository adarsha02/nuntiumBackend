const router = require("express").Router();
const reader = require("../model/reader");
const writer = require("../model/writer");
const bookmark = require("../model/bookmark");
const news = require("../model/news");

router.post("/det", async (req, res) => {
    const bookmarkData = await bookmark.find({
        news: req.body.news,
        reader: req.body.reader,
    });
    c = bookmarkData.length;
    console.log(c);
});

router.post("/register", async (req, res) => {
    try {
        const bookmarkData = await bookmark.find({
            news: req.body.news,
            reader: req.body.reader,
        });
if(!(bookmarkData.length == 0)) return res.send("already bookmarked")
        const bookmarkInfo = bookmark({
            news: req.body.news,
            reader: req.body.reader,
        });
        await bookmarkInfo.save();
        res.send("Bookmarked");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post("/check", async (req, res) => {

    try{
        const bookmarkData = await bookmark.find({
            news: req.body.news,
            reader: req.body.reader,
        });
        if(!(bookmarkData.length == 0)) return res.send(true)
        res.send(false)
    }catch(err){
        res.status(400).send(err.message)
    }
});

router.post("/delete", async (req, res) => {
    const readerID = req.body.reader;
    const newsID = req.body.news;
    try {
        const bookmarkData = await bookmark.find({
            news: req.body.news,
            reader: req.body.reader,
        });
        if(!(bookmarkData.length == 0)){
            await bookmark.findByIdAndDelete(bookmarkData[0]._id)
            return res.send(true)
        }
        return res.send(false)

        // const allBookmarkInfo = await bookmark.findOne({ reader: readerID });
        // if (allBookmarkInfo) {
        //     const bookmarkInfo = await bookmark.findOne({ news: newsID });
        //     if (bookmarkInfo) {
        //         const delBookmak = await bookmark.findByIdAndDelete(
        //             bookmarkInfo._id
        //         );
        //         if (delBookmak) {
        //             res.send(true);
        //         } else {
        //             res.send(false);
        //         }
        //     } else {
        //         res.send(false);
        //     }
        // } else {
        //     res.send(false);
        // }
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post("/list", async (req, res) => {
    let returnData = [];
    var counter = 0;
    let bookmarkInfo = await bookmark.find({ reader: req.body.reader });
    if(bookmarkInfo.length == 0) return res.send("No bookmarks")

    await bookmarkInfo.forEach(async (bookmark) => {
        let hey = {};
        let newsData = await news.findOne({ _id: bookmark.news });
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
