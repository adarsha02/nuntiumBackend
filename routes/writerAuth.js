const router = require('express').Router();
const writer = require('../model/writer');
const bcrypt = require('bcryptjs')

//Register a Writer
router.post('/register', async (req, res) =>{
    //Validation

    //Check if user is already in the database
    const emailExist = await writer.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new Writer
    const writerInfo = writer({
        name: req.body.name,
        email: req.body.email,
        password:hashedPassword,
        phone:req.body.phone,
        address:req.body.address,
        photoPath:req.body.photoPath,
        bio: req.body.bio,

    });
    try{
        await writerInfo.save(); 
        res.send("Writer registered Successfully"); 
    }catch(error){
        res.status(400).send(error.message)
    }
    
})

//Login a writer
router.post('/login', async(req, res) => {
    //Validate

    //check if user exist or not
    const user = await writer.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email not found');
    //Password check
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    const userwithID = await writer.findOne({email: req.body.email}).select('-password');
    res.send(userwithID);
})



module.exports = router;