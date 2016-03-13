var express = require('express');
var router = express.Router();


// Include Schema
var User = require('../mongodb/user-schema');
var Token = require('../mongodb/token-schema');

router.post('/login', function(req, res, next) {
	console.log(req.url);
	res.json({index : 'sdfsd'});
});

router.post('/register', function(req, res, next) {
	console.log(req.body);
	res.json({index : 'sdfsd'});
});

router.post('/logout', function(req, res, next) {
	console.log(req.url);
	res.json({index : 'sdfsd'});
});

module.exports = router;
