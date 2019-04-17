const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./src/routes/router');

const Connection = require('./src/connect');

// allow cross orgin request
app.use(cors());

//parse data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
//connection to database
Connection.then(() =>{
    console.log("connection successfull");
}).catch((err) => {
    console.log(err)
})


app.use('/routes', routes);


//app running on 4000 port
app.listen(4000, () => {
    console.log('App is running on port 4000');
});