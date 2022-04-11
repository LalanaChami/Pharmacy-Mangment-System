const mongoose = require('mongoose');

const doctorOrderSchema = mongoose.Schema({
  patientName: {type: String , require:true},
  patientDOB: {type: String , require:true},
  doctorName: {type: String , require:true},
  doctorContact: {type: String , require:true},
  doctorID: {type: String , require:true},
  doctorEmail: {type: String , require:true},
  drugId : { type: Array , require: true},
  drugNames : { type: Array , require: true},
  drugPrice: {type: Array , require:true},
  drugQuantity: {type: Array , require:true},
  realQuantity: {type: Array , require:true},
  totalAmount : { type: String , require: true},
  pickupDate : { type: String , require: true},
  dispenseStatus : { type: String , require: true},
  caseNumber : { type: String , require: false},
  //send full object here
  rawFHIRObject : { type: Object, require: false}
})

module.exports = mongoose.model('DoctorOrder',doctorOrderSchema);

