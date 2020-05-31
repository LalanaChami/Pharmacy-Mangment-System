const mongoose = require('mongoose');

const salesSchema = mongoose.Schema({
  drugName: {type: Array, require:true},
  // drugName:{type: String,require:true},
  dateTime: {type: Date, default: Date.now , require:true},
  totalPrice: {type: String , require:true},
  tax: {type: String , require:true},
  paidAmount: {type: String , require:true},
  balance : { type: String , require: true}
})

module.exports = mongoose.model('Sales',salesSchema);
