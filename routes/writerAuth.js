const router = require("express").Router();
const writer = require("../model/writer");
const bcrypt = require("bcryptjs");
const cloudinary = require("../middleware/cloudinary");
const upload = require("../middleware/upload");
//Register a Writer
router.post("/register", upload.single("writerPhoto"), async (req, res) => {
    //Validation
    if (
        req.body.name &&
        req.body.email &&
        req.body.password &&
        req.body.address &&
        req.body.bio 
    ) {
        //Check if user is already in the database
        const emailExist = await writer.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).send("Email already exists");

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //uploading the image
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "writerPhotos",
        });

        //create new Writer
        const writerInfo = writer({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            address: req.body.address,
            photoPath: result.secure_url,
            bio: req.body.bio,
        });
        try {
            await writerInfo.save();
            res.send("Writer registered Successfully");
        } catch (error) {
            res.status(400).send(error.message);
        }
    } else {
        res.send("Please enter all the required fields");
    }
});



//Login a writer
router.post("/login", async (req, res) => {
    //Validate

    //check if user exist or not
    const user = await writer.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email not found");
    //Password check
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password");

    const userwithID = await writer
        .findOne({ email: req.body.email })
        .select("-password");
    res.send(userwithID);
});

router.get("/list", async (req, res) => {
    try{
        const allWriter = await writer.find().select("-password")
        res.send(allWriter)
    }catch(err){
        res.status(400).send(err.message)
    }
    
})

router.post("/details", async (req, res) => {
    const writerDetails = await writer
        .findOne({ _id: req.body._id })
        .select("-password");
    if (!writerDetails) return res.status(400).send("No writer Found");

    res.send(writerDetails);
});

//Update a Writer
router.patch("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true };

        const result = await writer
            .findByIdAndUpdate(id, updates, options)
            .select("-password");
        if (!result) {
            res.send("Check if writer's id is valid");
        } else {
            res.send(result);
        }
    } catch (e) {
        res.send(e.message);
    }
});

router.post("/password", async (req, res) => {
    try {
        const userID = req.body._id;
        const password = req.body.password;
        const newpass = req.body.newPassword;
        const options = { new: true };

        const user = await writer.findOne({ _id: userID });
        // current Password check
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass)
            return res
                .status(400)
                .send("Please enter correct current password");

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newpass, salt);

        const result = await writer.findByIdAndUpdate(
            userID,
            { password: hashedPassword },
            options
        );
        if (!result) return res.send("Cannot update password");
        res.send("password changed successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
