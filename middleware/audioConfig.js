const multer = require("multer");

//Filtering so that received file is only audio. This accepts only file with extension mp3 and wav
const audioFilter = function (req, file, cb) {
    if (!file.mimetype.match(/mp|mp3|wav$i/)) {
        cb(new Error("Upload audio files only"), false);
        return;
    }
    cb(null, true);
};

const storage = multer.diskStorage({});

//maximum file size
var maxSize = 15 * 1000 * 1000;

var audioUpload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: audioFilter,
});

module.exports = audioUpload;
