const router = require("express").Router();
const liveupdate = require("../model/liveUpdate");

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
  const liveUpdateData = await liveupdate.find();
  res.send(liveUpdateData);
});

module.exports = router;
