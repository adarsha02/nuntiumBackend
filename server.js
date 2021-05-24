const express = require('express')
const bodyParser = require('body-parser')
const vhost = require('vhost')
const MongoClient = require('mongodb').MongoClient
var json_encode = require('json_encode');
const app = express();

//bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.listen(3030 , () => {
    console.log('server started')
})

app.get('/', (req,res)=> res.send("hello homepage"));


let apiRoutes = require("./api-routes")
app.use('/api', apiRoutes)

var url = 'mongodb://nuntium:nuntium1234@13.127.112.220:27017';


MongoClient.connect(url,{
    useUnifiedTopology: true
    })
    .then(client => {
        console.log('connected to DB')
        const db = client.db('nuntiumDB')
        

        // app.post('/person', (req, res)=>{
        //     kafalCollection.insertOne(req.body)
        //     .then(result => {
        //         res.redirect('/')
        //         console.log('Inserted');
        //     })
        //     .catch(error => console.error(error))
        // })

        app.get('/nuntiumNews', (req, res) =>{
            db.collection('nuntiumNews').find().toArray()
            .then(myData => {
                res.json(myData)
            })
            .catch(error => console.error(error))
        })

        

    })
    .catch(error => console.error(error)) 