var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  uniqueValidator = require('mongoose-unique-validator');

//Create a schema
var Post = new Schema({
  title: {
    type: String,
    required: [true, 'Please enter a title']
  },
  slug: {
    type: String,
    required: [true, 'Please create a slug'],
    unique: [true, 'The slug must be unique']
  },
  description: String,
  keywords: String,
  body: String,
  published: {
    type: Date,
    default: Date.now
  }
});

Post.plugin(uniqueValidator);

module.exports  = mongoose.model('Post', Post);
