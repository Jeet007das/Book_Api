const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var validator = require('validator');


var BookSchema = new Schema({
 book_name:{
    type:String,
    required:true
    },
  description: {
    type: String,
    required: true,
  },
  author_name: {
    type: String,
    required: true,
  },
  price:{
    type:Number,
    required:true
  },
  stock_count:{
      type:Number,
      required:true
  },
  seller_id:{
    type:String,
    required:true
  },
  book_category:{
      type:String,
      required:true
  },
  createdDate:{
    type:Date,
    default:Date.now
  }
});

BookSchema.set('toJSON', {virtuals:true});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;