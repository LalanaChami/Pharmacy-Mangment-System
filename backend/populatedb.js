const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const User = require('./models/user');

const mongoConnString = process.env.MONGODB_CONNSTRING ? process.env.MONGODB_CONNSTRING : 'mongodb://pharmacy-information-root:pharmacy-information-password@localhost:27017?retryWrites=true&w=majority';
mongoose.connect(mongoConnString, {useNewUrlParser: true , useUnifiedTopology: true});

bcrypt.hash('suzy', 10)
    .then(hash => {
      const user = new User({
        name: 'Suzy Pharmichael',
        contact: '555-555-5555',
        nic: '1234',
        email: 'spharmichael@example.com' ,
        password: hash,
        role: 'pharmacist',
      });

      // If we don't disable validation, mongoose-unique-validator will erroneously throw a ValidationError
      // on the User email unique constraint
      user.save()
        .finally(()=> {
          mongoose.connection.close();
        });
    });

