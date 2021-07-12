const router = require("express").Router();
const comment = require("../model/comment");
const discussion = require("../model/discussion");
const writer = require("../model/writer");

router.post("/register", async (req, res) => {
    //create new comment
    const commentInfo = comment({
        comment: req.body.comment,
        date: req.body.date,
        reader: req.body._id,
        discussion: req.body.discussion,
    });
    try {
        await commentInfo.save();
        res.send("Comment added");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/list/discussion", async (req, res) => {
    try {
        let commentData = await comment.find({
            discussion: req.body.discussion,
        });
        res.send(commentData);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post("/list/reader", async (req, res) => {
    try {
        let commentData = await comment.find({
            discussion: req.body.discussion,
            reader: req.body._id,
        });
        res.send(commentData)
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
