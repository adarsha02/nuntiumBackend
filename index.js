const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');



dotenv.config()


//Import Routes
const readerAuth = require('./routes/readerAuth');
const newsRoute = require('./routes/newsRoute');
const writerAuth = require('./routes/writerAuth');
const liveUpdate = require('./routes/liveupdateRoute');



//DB connection
mongoose.connect(process.env.DB_CONNECT,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex:true,
    },
    console.log('Connected to DB')
).catch((err)=>{console.log(err.message)})

//Middleware
app.use(express.json())
app.use(cors())

//Route Middleware
app.use('/api/reader', readerAuth);
app.use('/api/news', newsRoute);
app.use('/api/writer', writerAuth);
app.use('/api/liveupdate', liveUpdate);




app.get('/',(req,res)=>{
    res.send("hello nuntium");
})

app.listen(8000, ()=> console.log('Server started'))
