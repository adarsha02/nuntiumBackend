const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config()


//Import Routes
const authRoute = require('./routes/auth');



//DB connection
mongoose.connect(process.env.DB_CONNECT,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex:true,
    },
    console.log("Connected to db")
).catch((err)=>{console.log(err)})

//Middleware
app.use(express.json())
//app.use(bodyparser.json())


//Route Middleware
app.use('/api', authRoute);

app.listen(8000, ()=> console.log('Server started'))