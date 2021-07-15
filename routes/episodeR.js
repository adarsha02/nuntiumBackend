const router = require("express").Router();
const writer = require("../model/writer");
const episode = require("../model/episode");
const podcast = require("../model/podcast");
const cloudinary = require("../middleware/cloudinary");
const audioUpload = require("../middleware/audioConfig");

router.post(
    "/register",
    audioUpload.single("podcastEpisode"),
    async (req, res) => {
        try {
            if (
                req.body.podcast &&
                req.body.name &&
                req.body._id &&
                req.body.description &&
                req.body.guest
            ) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    resource_type: "auto",
                    folder: "podcasts",
                });
                const episodeInfo = episode({
                    podcast: req.body.podcast,
                    name: req.body.name,
                    description: req.body.description,
                    date: req.body.date,
                    audioPath: result.secure_url,
                    guest: req.body.guest,
                    writer: req.body._id,
                });

                await episodeInfo.save();
                res.send(episodeInfo);
            } else {
                res.send("please enter all the required field");
            }
        } catch (err) {
            res.send(err.message);
        }
    }
);

//list of all episodes to specific podcast
router.post("/list/podcast", async (req, res) => {
    try {
        let returnData = [];
        var counter = 0;

        let episodeData = await episode.find({
            podcast: req.body.podcast,
        });

        await episodeData.forEach(async (episode) => {
            let hey = {};

            let writerData = await writer.findOne({ _id: episode.writer });

            hey._id = episode._id;
            hey.name = episode.name;
            hey.date = episode.date;
            hey.description = episode.description;
            hey.audioPath = episode.audioPath;
            hey.guest = episode.guest;
            hey.podcast = episode.podcast;
            hey.writer = episode.writer;

            hey.writerName = writerData.name;
            hey.writerPhoto = writerData.photoPath;
            hey.writerBio = writerData.bio;

            returnData.push(hey);
            counter++;

            if (counter == episodeData.length) {
                res.send(returnData);
            }
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//deleting a episode

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const delRes = await episode.findByIdAndDelete(id);
        if (delRes) {
            res.send(delRes);
        } else {
            res.send("Please check if episode exist");
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
