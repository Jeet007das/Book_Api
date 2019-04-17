var mongoose = require('mongoose');
var validator = require('validator');


var UserSchema = new mongoose.Schema({
 name:{
    type:String,
    required:true
    },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  role:{
      type:String,
      required:true
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;