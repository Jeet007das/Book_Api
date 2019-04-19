const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var validator = require('validator');


var PurchaseSchema = new Schema({
 user_email:{
    type: String,
    required: true,
    trim: true,
    lowercase:true
    },
    book_id:{   
    type:String,
    required:true
}
});

PurchaseSchema.set('toJSON', {virtuals:true});

const Purchase = mongoose.model('Purchase', PurchaseSchema);
module.exports = Purchase;