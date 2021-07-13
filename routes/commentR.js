const router = require("express").Router();
const comment = require("../model/comment");
const discussion = require("../model/discussion");
const reader = require("../model/reader");
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

//list of all comments so specific discussion
router.post("/list/discussion", async (req, res) => {
    try {
        let returnData = [];
        var counter = 0;

        let commentData = await comment.find({
            discussion: req.body.discussion,
        });

        await commentData.forEach(async (comment) => {
            let hey = {};
            let readerData = await reader.findOne({ _id: comment.reader });
            hey._id = comment._id;
            hey.discussion = comment.discussion;
            hey.comment = comment.comment;
            hey.date = comment.date;
            hey.reader = comment._id;
            hey.readerName = readerData.name;
            hey.readerPhoto = readerData.photoPath;
            returnData.push(hey);
            counter++;
            if (counter == commentData.length) {
                res.send(returnData);
            }
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//deleting a comment

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const delRes = await comment.findByIdAndDelete(id);
        if (delRes) {
            res.send(delRes);
        } else {
            res.send("Please check if comment exist");
        }
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
        res.send(commentData);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
