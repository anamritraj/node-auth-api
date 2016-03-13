var Mongoose = require('./config');

var Schema = Mongoose.Schema;

var UserSchema = new Schema({
  name : String,
  email: String,
  password: String,
  added_on: Date,
  updated_on: Date
});

var User = Mongoose.model('User',UserSchema);

// User.create({
//   name:'Anand Amrit Raj',
//   email: 'anandamritraj904@gmail.com',
//   password: 'pass1234',
//   added_on: Date('23-07-2015'),
//   updated_on: Date('23-08-2015')
// }, function(err, small){
//   if(err) {
//     console.log(err);
//   }

//   console.log('Added!');
// });

module.exports = User;
