var mongoose = require('mongoose'); 
   Schema = mongoose.Schema; 
var Schema = new mongoose.Schema({  
  name: {type: String, required: true},
  image: String,
  description: {type: String, required: true},
  price: String,
  category: String,
  date: String,
  updated: String,
  user: String,
  number: String,
});
module.exports = mongoose.model('items', Schema);