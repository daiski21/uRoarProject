var mongoose = require('mongoose'); 
   Schema = mongoose.Schema; 
var CommentSchema = new mongoose.Schema
(
	{  
	  comment: {type: String, required: true},
	  user: String,
	  date: String,
	  name: String,
	},
	{
		collection: 'comment'
	}
);
module.exports = mongoose.model('comment', CommentSchema);