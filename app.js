const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');

// const jwt = require('./src/common/jwt');
// const dummyUser = require('./src/middleware/dummyuser');

var Ngocr = require("ng-ocr");
var fs = require("fs");

//parse data

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



// allow cross orgin request
app.use(cors());


//bind jwt token
// app.use(jwt())

//bind controllers
// app.use('/users', require('./src/Users/user.controller'));
// app.use('/books', require('./src/Books/book.controller'));
// app.use('/purchase', require('./src/Purchase/purchase.controller'));

// console.log(tesseract.process(__dirname+'/src/images/1.png',(err, null))
console.log('F:/Book_Project/Backend_Server/src/images/1.png'); 


Ngocr.decodeFile('F:/Book_Project/Backend_Server/src/images/total.png', function(error, data){
    console.log(data); // Hello World!
  });

var buffer = fs.readFileSync('F:/Book_Project/Backend_Server/src/images/total.png');
console.log(buffer);

Ngocr.decodeBuffer(buffer, (error, data) => 
{
    if(error){
        console.log("inside error");
        
        console.log(error);
        
    }
    else{
        console.log(data); // Hello World!
    }
 
});


// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, async () => {
    // await dummyUser();
    console.log('Server listening on port ' + port);
});