const express = require('express')
var jwt = require('jsonwebtoken')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const { restart } = require('nodemon');
require('dotenv').config()
const port = process.env.PORT ||5000
const app = express()

// kill port
//npx kill-port 5000

// middleware
app.use(cors())
app.use(express.json())


app.get('/',(req,res) =>{
    res.send('Server is running')
})

app.listen(port, ()=>{
    console.log('Listining port', port);
})