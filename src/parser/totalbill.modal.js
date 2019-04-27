const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TotalBillSchema = new Schema({
 totalAmount:{
    type:Number,
    required:true
    },
    date:{
        type:Date,
        default:Date.now  
    }
});

TotalBillSchema.set('toJSON', {virtuals:true});

const Total = mongoose.model('Total', TotalBillSchema);
module.exports = Total;