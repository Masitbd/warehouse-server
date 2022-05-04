const express = require('express')
require('dotenv').config()
//var jwt = require('jsonwebtoken')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const { restart } = require('nodemon');
const port = process.env.PORT ||5000
const app = express()

// kill port
//npx kill-port 5000

// middleware
app.use(cors())
app.use(express.json())

//const uri=`mongodb+srv://wareHouseManagement:4UqUUtqkTGmYJipo@cluster0.x3xvq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const uri=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x3xvq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)  
async function run(){
try {
   client.connect() 
   const itemCollection = client.db('warehouseManagement').collection('item')


   app.get('/item', async(req,res)=>{
       const query = {}
       const cursor=itemCollection.find(query)
       const items = await cursor.toArray()
       res.send(items)
   })

   app.get('/item/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const query = { _id: ObjectId(id) };
    const item = await itemCollection.findOne(query);
    res.send(item);
});
} finally {
    
}
}
run().catch(console.dir);
app.get('/',(req,res) =>{
    res.send('Server is running')
})

app.listen(port, ()=>{
    console.log('Listining port', port);
})