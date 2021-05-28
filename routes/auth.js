const router = require('express').Router();
const reader = require('../model/reader');
const bcrypt = require('bcryptjs')



//Register a User
router.post('/reader/register', async (req, res) =>{
    //Validation

    //Check if user is already in the database
    const emailExist = await reader.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new Reader
    const readerInfo = reader({
        name: req.body.name,
        email: req.body.email,
        password:hashedPassword,
        phone:req.body.phone,
        address:req.body.address,
        photoPath:req.body.photoPath,

    });
    try{
        await readerInfo.save(); 
        res.send("Registered Successfully"); 
    }catch(error){
        res.status(400).send(error.message)
    }
    
})

//Login
router.post('/reader/login', async(req, res) => {
    //Validate

    //check if user exist or not
    const user = await reader.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email not found');
    //Password check
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    res.send('Success')
})

module.exports = router;