const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
  name: {type: String , require:true},
  quantity: {type: String , require:true},
  batchId: {type: String , require:true},
  expireDate: {type: String , require:true}
})

module.exports = mongoose.model('Inventory',inventorySchema);
