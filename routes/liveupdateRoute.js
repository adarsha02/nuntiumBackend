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

router.get("/list", async (req, res, next) => {
    let returnData = [];
    var counter = 0;
    let liveUpdateData = await liveupdate.find();

    try {
        await liveUpdateData.forEach(async (liveupdate) => {
            let hey = {};
            let writerData = await writer.findOne({ _id: liveupdate.writer });
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
    } catch (err) {
        next(err);
    }
});

router.get("/list/latest", async (req, res) => {
    let returnData = [];
    var counter = 0;
    const date = new Date();
    const maxNumOfNews = 15;
    try{
        const latestLiveUpdate = await liveupdate
        .find({ date: { $lte: Date.now() } })
        .sort({ date: "desc" })
        .limit(maxNumOfNews);
        await latestLiveUpdate.forEach(async (liveupdate) => {
            let hey = {};
            let writerData = await writer.findOne({ _id: liveupdate.writer });
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
            if (counter == latestLiveUpdate.length) {
                res.send(returnData);
            }
        });

    }catch(err){
        res.status(400).send(err.message)
    }

});

//News that belongs to specific writer
router.post("/list/writer", async (req, res) => {
    console.log(req.body._id);
    const liveupdate_writer = await liveupdate.find({ writer: req.body._id });
    res.send(liveupdate_writer);
});

//Update a liveupdate
router.patch("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true };

        const result = await liveupdate.findByIdAndUpdate(id, updates, options);
        res.send(result);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

//deleting a liveupdate

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const delRes = await liveupdate.findByIdAndDelete(id);
        if (delRes) {
            res.send(delRes);
        } else {
            res.send("Please check if liveupdate exist");
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
