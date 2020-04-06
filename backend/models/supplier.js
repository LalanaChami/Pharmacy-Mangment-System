const mongoose = require('mongoose');

const supplierSchema = mongoose.Schema({
  supplierID: {type: String , require:true},
  name: {type: String , require:true},
  email: {type: String , require:true},
  contact: {type: String , require:true},
  drugsAvailable: {type: String , require:true}
})

module.exports = mongoose.model('Supplier',supplierSchema);
