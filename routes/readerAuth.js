const router = require("express").Router();
const reader = require("../model/reader");
const bcrypt = require("bcryptjs");
const { response } = require("express");

//Register a Reader
router.post("/register", async (req, res) => {
    //Validation

    //Check if user is already in the database
    const emailExist = await reader.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new Reader
    const readerInfo = reader({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        address: req.body.address,
        photoPath: req.body.photoPath,
    });
    try {
        await readerInfo.save();
        res.send("Registered Successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//Login a reader
router.post("/login", async (req, res) => {
    //Validate

    //check if user exist or not
    const user = await reader.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email not found");
    //Password check
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password");

    const userwithID = await reader
        .findOne({ email: req.body.email })
        .select("-password");
    res.send(userwithID);
});

//Update a Reader
router.patch("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true };

        const result = await reader
            .findByIdAndUpdate(id, updates, options)
            .select("-password");
        if (!result) {
            res.send("Check if reader's id is valid");
        } else {
            res.send(result);
        }
    } catch (e) {
        res.send(e.message);
    }
});

module.exports = router;
