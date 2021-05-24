let router = require('express').Router();
 router.get('/', (req, res) =>{
     res.json({
         status: "working",
         message: "Welcome to REST API"
     })
 })

 module.exports = router;