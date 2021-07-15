const multer = require("multer");

// const allowedMimeTypes = ['audio/mp3', 'audio/wav'];

// const audioFilter = function (req, file, cb) {
//   if (allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
//     cb(new Error("Please upload only audio files"), false);
//   }
//   cb(null, true);
// };

const audioFilter = function(req, file, cb){
  if(!file.mimetype.match(/mp|mp3|wav$i/)){
    cb(new Error("Upload audio files only"), false)
    return
    
  }
  cb(null,true);
}


const storage = multer.diskStorage({

});

var maxSize = 15 * 1000 * 1000;

var audioUpload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: audioFilter,
});

module.exports = audioUpload;
