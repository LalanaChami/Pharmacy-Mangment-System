var mongoose = require('mongoose');
var User = require('./models/user');

const mongoConnString = process.env.MONGODB_CONNSTRING ? process.env.MONGODB_CONNSTRING : 'mongodb://pharmacy-information-root:pharmacy-information-password@localhost:27017?retryWrites=true&w=majority';
mongoose.connect(mongoConnString, {useNewUrlParser: true , useUnifiedTopology: true});

const user = new User({
  name: 'alice',
  contact: '555-555-5555',
  nic: '1234',
  email: 'alice@example.com' ,
  password: '$2a$10$CMRf90.VvXfd9CN04duIi.QvtO.US1Gcdzs3aRJsbWztKBstm8wgy',
  role: 'pharmacist',
});

// If we don't disable validation, mongoose-unique-validator will erroneously throw a ValidationError
// on the User email unique constraint
user.save({ validateBeforeSave: false })
  .finally(()=> {
    mongoose.connection.close()
  });
