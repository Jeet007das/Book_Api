const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
let bodyParser = require('body-parser');

const Connection = require('./src/connect');

// allow cross orgin request
app.use(cors());

//parse data
app.use(bodyParser.json());
 
//connection to database
Connection.then(() =>{
    console.log("connection successfull");
}).catch((err) => {
    console.log(err)
})

//app running on 4000 port
app.listen(4000, () => {
    console.log('App is running on port 4000');
});