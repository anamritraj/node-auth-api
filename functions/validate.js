var validator = require('validator');

validator.clean = function(string){
	string = validator.trim(string);
	string = validator.escape(string);
	return string;
};

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

validator.getCurrentTime = function(){
	var d = new Date();
	return d.getTime();
};
module.exports = validator;