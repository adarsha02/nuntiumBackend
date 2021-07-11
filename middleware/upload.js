const multer = require("multer");


const imageFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Please upload only images"), false);
    }
};

const storage = multer.diskStorage({
    // destination: function (req, file, callback) {
    //     callback(null, "newsPhotos/");
    // },
    // filename: function (req, file, callback) {
    //     callback(null, file.fieldname + "-" + Date.now() + ".jpg");
    // },
});
var maxSize = 1*1000*1000;
var upload = multer({ storage: storage,limits:{fileSize: maxSize}, fileFilter: imageFilter });

module.exports = upload;

