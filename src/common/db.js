const mongoose = require('mongoose');
let Connection = mongoose.connect('mongodb://mocadmin:mocadmin@139.59.35.239:27017/admin', {useNewUrlParser: true});
module.exports = Connection;