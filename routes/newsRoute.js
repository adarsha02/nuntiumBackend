const router = require("express").Router();
const news = require("../model/news");
const writer = require("../model/writer");
const multer = require("multer");
//const upload = multer({dest: 'newsPhotos/'});

router.post("/register", async (req, res) => {
    //Validation

    //create new news
    const newsInfo = news({
        category: req.body.category,
        headline: req.body.headline,
        article: req.body.article,
        date: req.body.date,
        keyword: req.body.keyword,
        photoPath: req.body.photoPath,
        views: req.body.views,
        up: req.body.up,
        down: req.body.down,
        writer: req.body._id,
    });
    try {
        await newsInfo.save();
        res.send("News Added");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/list", async (req, res) => {
    let returnData = [];
    var counter = 0;
    let newsData = await news.find();

    await newsData.forEach(async (news) => {
        let hey = {};
        let writerData = await writer.findOne({ _id: news.writer });
        hey._id=news._id;
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

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "newsPhotos/");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
});
var upload = multer({ storage: storage });
router.post("/image", upload.single("file"), (req, res) => {
    if (!req.file) {
        console.log("No file recvd");
        res.send("No file");
    } else {
        const host = req.hostname;
        const filePath = req.protocol + "://" + host + "/" + req.file.path;
        console.log(filePath);
        console.log("file recvd");
        res.send("File recvd");
    }
});

module.exports = router;
