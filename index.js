const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config()


//Import Routes
const readerAuth = require('./routes/readerAuth');
const newsRoute = require('./routes/newsRoute');
const writerAuth = require('./routes/writerAuth');



//DB connection
mongoose.connect(process.env.DB_CONNECT,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex:true,
    },
).catch((err)=>{console.log(err.message)})

//Middleware
app.use(express.json())
//app.use(bodyparser.json())


//Route Middleware
app.use('/api/reader', readerAuth);
app.use('/api/news', newsRoute);
app.use('/api/writer', writerAuth);


app.listen(8000, ()=> console.log('Server started'))