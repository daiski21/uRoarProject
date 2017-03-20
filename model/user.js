var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose'),
    validate = require('mongoose-validator');

var usernameValidator = [
	validate({
		validator: 'isLength',
		arguments: [8, 15]
	}),
	validate({
 	 	validator: 'matches',
  		arguments: /^[a-zA-Z\-]+$/i
	})
];

var emailValidator = [
	validate({
		validator: 'matches',
		arguments: /^([A-Za-z0-9_!#$%&’*+=?^_`{|}~\-\.]{2,10})+\@([A-Za-z0-9]{2,10})+\.([A-Za-z]{2,4})$/
	})
];

var User = new Schema
(
	{
		fname: String,
		lname: String,
		username: {type: String, required: true, validate: usernameValidator},
		email: {type: String, required: true, validate: emailValidator},
		password: String,
		number: {type: String, required:true},
	},
	{
		collection: 'User'
	}

);

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);