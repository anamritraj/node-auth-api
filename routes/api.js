var express = require('express');
var router = express.Router();

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
		// Validate credentials and generate token
		
	}
	res.json({index : 'sdfsd'});
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
	console.log(req.url);
	res.json({index : 'sdfsd'});
});

module.exports = router;
