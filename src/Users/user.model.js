const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var validator = require('validator');


var UserSchema = new Schema({
 name:{
    type:String,
    required:true
    },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase:true
  },
  password: {
    type: String,
    required: true,
  },
  createdDate:{
    type:Date,
    default:Date.now
  },
  token:[{
    type:String 
  }]
});

UserSchema.set('toJSON', {virtuals:true});

const User = mongoose.model('User', UserSchema);
module.exports = User;