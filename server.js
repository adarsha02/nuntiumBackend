const express = require('express')
const bodyParser = require('body-parser')
const vhost = require('vhost')
const MongoClient = require('mongodb').MongoClient
var json_encode = require('json_encode');
const app = express();


app.listen(3030 , () => {
    console.log('server started')
})

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
                console.log(json_encode(myData));
            })
            .catch(error => console.error(error))
        })

        

    })
    .catch(error => console.error(error)) 