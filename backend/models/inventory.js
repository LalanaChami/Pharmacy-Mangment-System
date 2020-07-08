const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
  email: {type: String , require:true},
  name: {type: String , require:true},
  quantity: {type: String , require:true},
  batchId: {type: String , require:true},
  expireDate: {type: Date , require:true},
  price: {type: String , require:true},
  imagePath : { type: String , require: true}
})

module.exports = mongoose.model('Inventory',inventorySchema);
