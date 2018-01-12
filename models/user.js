var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose'),
  uniqueValidator = require('mongoose-unique-validator');

//Create a schema
var User = new Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: [true, 'Email must be unique']
  },
  username: {
    type: String,
    required: [true, 'Please enter a username'],
    unique: [true, 'Usernames must be unique']
  },
  password: String,
  first_name: String,
  last_name: String,
  admin: {
    type: Boolean,
    default: false
  }
});

User.plugin(passportLocalMongoose);
User.plugin(uniqueValidator);

module.exports  = mongoose.model('User', User);
