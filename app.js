const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');


// const jwt = require('./src/common/jwt');
// const dummyUser = require('./src/middleware/dummyuser');
// const sharp = require('sharp');

var fs = require("fs");
const fileService = require('./src/parser/fileReadService');





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
console.log(__dirname+'/src/image_output_file'); 

  checkFileInDirectory = async () => {
   await fs.readdir(__dirname+'/src/image_output_file', (err, files) => {
        if(err){
            console.log("File directory not found");
        }else{
            if(files.length > 0){
                let res = 0
                for(fileName of files){
                     fileService(fileName, (data, err) =>{
                      if(err){
                          console.log("cannot find value");
                          
                      }else{
                          console.log(data);
                          
                      }
                  });
                }
            }else{
                console.log("You haven't file in your directory");
            }
           
         }
      });
  }


// fs.readFile(textFile, function(err, buf) {
//     console.log(buf);
//     var billData = [];
//     for(var temp in buf){
//         billData.push(String.fromCharCode(buf[temp]));
//   }
//   //your 'loop' logic goes here, y = temperatures
//   //console.log(billData);
//   console.log("finding");
  
//   console.log(billData.indexOf('T'));
   
//   });





// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, async () => {
     await checkFileInDirectory();
    console.log('Server listening on port ' + port);
});