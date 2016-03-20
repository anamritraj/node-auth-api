var validator = require('validator');
var User = require('../mongodb/user-schema');

/*
Cleans the string for insertion in the database
 */
validator.clean = function(string){
	string = validator.trim(string);
	string = validator.escape(string);
	string = validator.blacklist(string, '<\\\/>%');
	return string;
};

/*
Validates and returns clean password before insertion in the database
 */
validator.password = function(string){
	string = validator.trim(string);
	string = validator.escape(string);
	result = {};
	if (string.length < 8) {
		result.success = false;
		result.message = "Password must be greater than 8 characters.";
	}else{
		result.success = true;
	}
	return result;
};

/*
Checks if the email is alredy registered. Returns true if alredy registered, false otherwise.
 */
validator.userAlreadyRegistered = function(email){
	User.findOne({ 'email': email }, 'email', function (err, person) {
	  if (err) return handleError(err);
	  if (person) {
	  	return true;
	  }else{
	  	return false;
	  }
	});
};

/*
Checks if the email and password combination is matching. Returns true if matches, false otherwise.
 */
validator.validateCredentials = function(email, password){
	User.findOne({ 'email': email, 'password':password }, 'name', function (err, person) {
	  if (err) return handleError(err);
	  if (person) {
	  	return true;
	  }else{
	  	return false;
	  }
	});
};



/*
Returns current time
 */
validator.getCurrentTime = function(){
	var d = new Date();
	return d.getTime();
};
module.exports = validator;