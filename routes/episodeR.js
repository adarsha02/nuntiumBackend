const router = require("express").Router();
const news = require("../model/news");
const writer = require("../model/writer");
const cloudinary = require("../middleware/cloudinary");
const audioUpload = require("../middleware/upload");





module.exports = router;