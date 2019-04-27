const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TotalBillSchema = new Schema({
 totalAmount:{
    type:String,
    required:true
    }
});

TotalBillSchema.set('toJSON', {virtuals:true});

const Total = mongoose.model('Total', TotalBillSchema);
module.exports = Total;