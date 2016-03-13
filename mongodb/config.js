
var mongoose = require('mongoose');

// Database connectivity
var mongoOptions = {
  user: '',
  pass: ''
};
var url = '127.0.0.1:27017/myApp';

// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    url = process.env.OPENSHIFT_MONGODB_DB_URL +
    process.env.OPENSHIFT_APP_NAME;
    var mongoOptions = {
      user: process.env.OPENSHIFT_MONGODB_DB_USERNAME,
      pass: process.env.OPENSHIFT_MONGODB_DB_PASSWORD
    };
}

mongoose.connect(url, mongoOptions);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log('Connected to Database!');
});

module.exports = mongoose;

