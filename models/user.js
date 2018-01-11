var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

//Create a schema
var User = new Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email']
  },
  username: {
    type: String,
    required: [true, 'Please enter a username']
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

module.exports  = mongoose.model('User', User);
