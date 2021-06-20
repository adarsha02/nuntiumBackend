const router = require("express").Router();
const liveupdate = require("../model/liveUpdate");
const writer = require("../model/writer");

router.post("/register", async (req, res) => {
    //Validation

    //create new news
    const liveUpdateInfo = liveupdate({
        category: req.body.category,
        headline: req.body.headline,
        subheadline: req.body.subheadline,
        date: req.body.date,
        keyword: req.body.keyword,
        writer: req.body._id,
    });
    try {
        await liveUpdateInfo.save();
        res.send("Liveupdate Added");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/list", async (req, res) => {
    let returnData = [];
    var counter = 0;
    let liveUpdateData = await liveupdate.find();

    await liveUpdateData.forEach(async (liveupdate) => {
        let hey = {};
        let writerData = await writer.findOne({ _id: liveupdate.writer });
        console.log(writerData);
        hey._id = liveupdate._id;
        hey.headline = liveupdate.headline;
        hey.subheadline = liveupdate.subheadline;
        hey.category = liveupdate.category;
        hey.date = liveupdate.date;
        hey.keyword = liveupdate.keyword;
        hey.writer = liveupdate.writer;
        hey.writerName = writerData.name;
        hey.writerPhoto = writerData.photoPath;
        hey.writerBio = writerData.bio;
        hey.writer = writerData._id;
        returnData.push(hey);
        counter++;
        if (counter == liveUpdateData.length) {
            res.send(returnData);
        }
    });
});

module.exports = router;
