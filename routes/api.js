var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {
	console.log(req.url);
	res.json({index : 'sdfsd'});
});

router.post('/register', function(req, res, next) {
	console.log(req.url);
	res.json({index : 'sdfsd'});
});

router.post('/logout', function(req, res, next) {
	console.log(req.url);
	res.json({index : 'sdfsd'});
});

module.exports = router;
