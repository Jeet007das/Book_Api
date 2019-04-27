var fs = require("fs");


var billData = [];


async function fileReadService(file_name , callback){
    let textFile = "D:/practice_project/Book_Project/Book_Api/src/image_output_file/" +file_name;
     fs.readFile(textFile, function (err, bufferValue) {
        if (err) {
            callback(null,"File is not specfied format")
         }
        billData = [];
        for (var temp in bufferValue) {
            billData.push(String.fromCharCode(bufferValue[temp]));
        }
        let data = billData.join()
        let tempString = data.replace(/[.,\s]/g, " ");
        let data2 = tempString.split('  ');
        let totalValue;
     let find = data2.findIndex(val => val == ' G r a n d');
        if (find != -1) {
            totalValue = data2[find + 2].replace(/ /g, '');
            callback(parseInt(totalValue));
         } else {
            find = data2.findIndex(val => val == ' N e t');
            if (find == -1) {
                find = data2.findIndex(val => val == ' A m o u n t');
                if (find != -1) {
                    totalValue = data2[find + 4].replace(/ /g, '');
                    callback(parseInt(totalValue));
                }
            } else {
                totalValue = data2[find + 2].replace(/ /g, '');
                callback(parseInt(totalValue));
            }
        }

     
    });






}




module.exports = fileReadService
 