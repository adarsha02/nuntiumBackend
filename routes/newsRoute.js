const router = require("express").Router();
const news = require("../model/news");
const writer = require("../model/writer");
const cloudinary = require("../middleware/cloudinary");
const upload = require("../middleware/upload");

router.get("/list", async (req, res) => {
    let returnData = [];
    var counter = 0;
    let newsData = await news.find();

    await newsData.forEach(async (news) => {
        let hey = {};
        let writerData = await writer.findOne({ _id: news.writer });
        hey._id = news._id;
        hey.article = news.article;
        hey.headline = news.headline;
        hey.category = news.category;
        hey.date = news.date;
        hey.up = news.up;
        hey.down = news.down;
        hey.views = news.views;
        hey.photoPath = news.photoPath;
        hey.keyword = news.keyword;
        hey.writerName = writerData.name;
        hey.writerPhoto = writerData.photoPath;
        hey.writerBio = writerData.bio;
        hey.writer = writerData._id;
        returnData.push(hey);
        counter++;
        if (counter == newsData.length) {
            res.send(returnData);
        }
    });
});

router.post("/register", upload.single("newsPhoto"), async (req, res) => {
    try {
        if (
            req.body.category &&
            req.body.article &&
            req.body._id &&
            req.body.headline
        ) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "newsPhotos",
            });
            //res.json(result.secure_url)
            const newsInfo = news({
                category: req.body.category,
                headline: req.body.headline,
                article: req.body.article,
                date: req.body.date,
                keyword: req.body.keyword,
                photoPath: result.secure_url,
                views: req.body.views,
                up: req.body.up,
                down: req.body.down,
                writer: req.body._id,
            });

            await newsInfo.save();
            res.send(newsInfo);
        } else {
            res.send("please enter all the required field");
        }
    } catch (err) {
        res.send(err.message);
    }
});

router.patch("/news/update/:id", async (req, res) => {});

//News that belongs to specific writer
router.post("/list/writer", async (req, res) => {
    try {
        const news_writer = await news.find({ writer: req.body._id });
        res.send(news_writer);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
