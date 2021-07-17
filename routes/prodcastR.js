const router = require("express").Router();
const podcast = require("../model/podcast");
const writer = require("../model/writer");
const cloudinary = require("../middleware/cloudinary");
const upload = require("../middleware/upload");
const episode = require("../model/episode");

router.post("/register", upload.single("podcastPhoto"), async (req, res) => {
    //Validation

    if (req.body.name && req.body.description && req.body._id) {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "podcastPhotos",
        });

        //create new podcast
        const podcastInfo = podcast({
            name: req.body.name,
            description: req.body.description,
            photoPath: result.secure_url,
            date: req.body.date,
            writer: req.body._id,
        });
        try {
            await podcastInfo.save();
            res.send("Podcast Added");
        } catch (error) {
            res.status(400).send(error.message);
        }
    } else {
        res.send("please enter all values");
    }
});

router.get("/list", async (req, res) => {
    try {
        let returnData = [];
        var counter = 0;
        let podcastData = await podcast.find();
        if (podcastData) {
            await podcastData.forEach(async (podcast) => {
                let hey = {};
                let writerData = await writer.findOne({ _id: podcast.writer });
                hey._id = podcast._id;
                hey.name = podcast.name;
                hey.description = podcast.description;
                hey.photoPath = podcast.photoPath;
                hey.date = podcast.date;
                hey.writerName = writerData.name;
                hey.writerPhoto = writerData.photoPath;
                hey.writerBio = writerData.bio;
                hey.writer = writerData._id;
                returnData.push(hey);
                counter++;
                if (counter == podcastData.length) {
                    res.send(returnData);
                }
            });
        } else {
            res.send("No podcast found in Database");
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//Update a podcast
router.patch("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true };

        const result = await podcast.findByIdAndUpdate(id, updates, options);
        res.send(result);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

//deleting a podcast and along with its all episodes

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const delRes = await podcast.findByIdAndDelete(id);
        const episodeData = await episode.find({ podcast: id });

        if (delRes) {
            await episodeData.forEach(async (episodes) => {
                await episode.findByIdAndDelete(episodes._id);
            });
            res.send(delRes);
        } else {
            res.send("Please check if podcast exist");
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});


//podcast that belongs to specific writer
router.post("/list/writer", async (req, res) => {
    try {
        const podcast_writer = await podcast.find({ writer: req.body._id });
        res.send(podcast_writer);
    } catch (err) {
        res.status(400).send(err.message);
    }
});
module.exports = router;
