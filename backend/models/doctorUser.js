const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const doctorUserSchema = mongoose.Schema({
  name: {type: String , require:true},
  contact: {type: String , require:true},
  docId: {type: String , require:true},
  email: {type: String , require:true, unique:true} ,
  password: {type: String , require:true},
  dateTime: {type: Date, default: Date.now , require:true}
});

doctorUserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('DoctorUser',doctorUserSchema);
