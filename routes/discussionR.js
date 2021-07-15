const router = require("express").Router();
const discussion = require("../model/discussion");
const writer = require("../model/writer");
const comment = require("../model/comment");


router.post('/register',async (req,res)=>{
       //create new discussion
       const discussionInfo = discussion({
        category: req.body.category,
        headline: req.body.headline,
        subheadline: req.body.subheadline,
        opinion: req.body.opinion,
        date: req.body.date,
        writer: req.body._id,
    });
    try {
        await discussionInfo.save();
        res.send("Discussion added");
    } catch (error) {
        res.status(400).send(error.message);
    }
})



router.get("/list", async (req, res) => {
    let returnData = [];
    var counter = 0;
    let discussionData = await discussion.find();

    await discussionData.forEach(async (discussion) => {
        let hey = {};
        let writerData = await writer.findOne({ _id: discussion.writer });
        hey._id=discussion._id;
        hey.opinion = discussion.opinion;
        hey.headline = discussion.headline;
        hey.category = discussion.category;
        hey.date = discussion.date;
        hey.subheadline = discussion.subheadline;
        hey.writerName = writerData.name;
        hey.writerPhoto = writerData.photoPath;
        hey.writerBio = writerData.bio;
        hey.writer = writerData._id;
        returnData.push(hey);
        counter++;
        if (counter == discussionData.length) {
            res.send(returnData);
        }
    });
});

//Discussion that belongs to specific writer
router.post("/list/writer",async(req, res)=>{
    try{
        const discussion_writer = await discussion.find({writer:req.body._id})
        res.send(discussion_writer)
    }catch(err){
        res.status(400).send(err.message)
    }     
 });

//Update a discussion
router.patch("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true };

        const result = await discussion.findByIdAndUpdate(id, updates, options);
        res.send(result);
    } catch (e) {
        res.status(400).send(e.message);
    }
});


 //deleting a discussion and along with its all comments

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const commentData = await comment.find({ discussion: id });
        const delRes = await discussion.findByIdAndDelete(id);

        if (delRes) {
            await commentData.forEach(async (comments) => {
                await comment.findByIdAndDelete(comments._id)
            });
            res.send(delRes);
        } else {
            res.send("Please check if discussion exists");
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});

 module.exports = router;