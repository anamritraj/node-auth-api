var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var router = express.Router();

var jwtsecret = process.env.JWT_SECRET_KEY;

if (process.env.OPENSHIFT_SECRET_TOKEN) {
	jwtsecret = process.env.OPENSHIFT_SECRET_TOKEN;
}
console.log(jwtsecret);
// Include Validator (Our Custom Script)
var validate = require('../functions/validate.js');

// Include Schema
var User = require('../mongodb/user-schema');
var Token = require('../mongodb/token-schema');

router.post('/login', function(req, res, next) {
	console.log(req.body);
	// TODO: Check if the user is already logged in.
	// Validate the data
	var email = validate.clean(req.body.email),
		password = validate.clean(req.body.password);
		message = {};
		success = true;
		message.errorFields = [];
		message.errors = [];
	
	//email validation
	if (!validate.isEmail(email) || email.length < 5) {
		success = false;
		message.errorFields.push('email');
		message.errors.push('Email is not Valid');
	}
	//password validation
	validatePassword = validate.password(password);
	if (!validatePassword.success) {
		success = false;
		message.errorFields.push('password');
		message.errors.push(validatePassword.message);
	}
	if (success === false) {
		res.json({message:message, success:success});
	}else{
		// Validate credentials and generate token
		User.findOne({ 'email': email}, 'password', function (err, person) {
			var result = {};
			if (err) {
				result.success = false;
				result.message = "An internal error occured!";
				res.json({success: false, message:result.message});		
			}else if(person) {
			  	// User exits
				bcrypt.compare(password, person.password, function(err, compareSuccess) {
				    if (err) {
				    	console.log(err);
					  	result.success = false;
					  	result.message = "An internal error occured!";
						res.json({success: false, message:result.message});
				    }else if(compareSuccess){
					  	result.success = true;
						////////////////////
					  	// Generate token //
						////////////////////
						var token = jwt.sign({email: email}, jwtsecret,{
					        expiresIn: 24 * 60 * 60// expires in 24 hours
					    });
					    Token.create({
						  token: token,
						  email: email,
						  added_on: validate.getCurrentTime(),
						  }, function(err, small){
						  if(err) {
							result.success = false;
						  	result.message = "An internal error occured!";
							res.json({success: false, message:result.message});
						  }
						  // Successfully inserted token in the database
						  res.json({success: true, token:token});
						});
				    }else{
				    	result.success = false;
					  	result.message = "Incorrect Password";
						res.json({success: false, message:result.message});
				    }
				});
			}else{
			  	// No user found
		    	result.success = false;
			  	result.message = "User does not exists";
				res.json({success: false, message:result.message});
			}
		});
	}
});

router.post('/register', function(req, res, next) {
	console.log(req.body);
	// TODO: Check if the user is already logged in.
	
	// Validate the data
	var name = validate.clean(req.body.name),
		email = validate.clean(req.body.email),
		password = validate.clean(req.body.password);
		message = {};
		success = true;
		message.errorFields = [];
		message.errors = [];
	
	// name validation
	if(name.length < 1){
		success = false;
		message.errorFields.push('name');
		message.errors.push('Name is not Valid');
	}

	//email validation
	if (!validate.isEmail(email) || email.length < 5) {
		success = false;
		message.errorFields.push('email');
		message.errors.push('Email is not Valid');
	}else if (!validate.userAlreadyRegistered(email)) {
		message.errorFields.push('email');
		message.errors.push('Email is already registered');
		
	}
	//password validation
	validatePassword = validate.password(password);
	if (!validatePassword.success) {
		success = false;
		message.errorFields.push('password');
		message.errors.push(validatePassword.message);
	}
	if (success === false) {
		res.json({message:message, success:success});
	}else{
		// Inserting the data in the database
		User.create({
		  name:name,
		  email: email,
		  password: password,
		  added_on: validate.getCurrentTime(),
		  updated_on:validate.getCurrentTime()
		}, function(err, small){
		  if(err) {
			message.errorFields.push('internal error');
			message.errors.push(err);
		  }
		  // Successfully inserted in the database
			res.json({message:'You have registered Successfully', success:true});
		});
	}
});

router.post('/logout', function(req, res, next) {
	// submit the token as post data or in the headers
	var token = req.headers.token || req.body.token;
	console.log(token);
	Token.findOneAndRemove({ 'token': token}, 'email', function (err, deletedToken) {
		if (err) {
			res.json({success:false, message:err});
		}
		if (deletedToken) {
			res.json({success:true, message:"Successfully deleted token for "+deletedToken.email});			
		}else{
			res.json({success:false, message:"Nothing found!"});
		}
	});
});

module.exports = router;
