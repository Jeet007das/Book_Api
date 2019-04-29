const express = require('express');
const app = express();
const cors = require('cors');

var fs = require("fs");
const fileService = require('./src/parser/fileReadService');
const saveTotal = require('./src/parser/saveDatabaseService');

// allow cross orgin request
app.use(cors());


console.log(__dirname + '/src/image_output_file');
var total = 0

checkInFolder = async (files, call) => {
    let res = 0;
    if (files.length > 0) {
        for (fileName of files) {
            fileService(fileName, (data, err) => {
                if (err) {
                    call("cannot find value", null)
                } else {
                    res = res + data;
                }
            });
        }
        setTimeout(() => { call(res) }, 4000);
    } else {
        call(null, "Something error")
        console.log("You haven't file in your directory");
    }
}



checkFileInDirectory = async () => {
    await fs.readdir(__dirname + '/src/image_output_file', (err, files) => {
        if (err) {
            console.log("File directory not found");
        } else {
            checkInFolder(files, (success, err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("inside success");
                    saveTotal(success,(err,data) =>{
                        if(err){
                            console.log("database saving error");
                            
                        }else{
                            console.log(data);
                            
                        }
                    })
                }
            });


        }
    });
}




// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, async () => {
    await checkFileInDirectory();
    console.log('Server listening on port ' + port);
});