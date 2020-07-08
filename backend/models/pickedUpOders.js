const mongoose = require('mongoose');

const pickedUPDoctorOderSchema = mongoose.Schema({
  doctorName: {type: String , require:true},
  doctorContact: {type: String , require:true},
  doctorID: {type: String , require:true},
  doctorEmail: {type: String , require:true},
  drugNames : { type: Array , require: true},
  drugPrice: {type: Array , require:true},
  drugQuantity: {type: Array , require:true},
  totalAmount : { type: String , require: true},
  pickupDate : { type: String , require: true},
  dateTime: {type: Date, default: Date.now , require:true}
})

module.exports = mongoose.model('PickedUpDoctorOder',pickedUPDoctorOderSchema);
