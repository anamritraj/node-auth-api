var Mongoose = require('./config');
var bcrypt = require('bcrypt-nodejs');

var Schema = Mongoose.Schema;

var UserSchema = new Schema({
  name : {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  added_on: Date,
  updated_on: Date
});

UserSchema.pre('save', function(next){
    var user = this;
    SALT_WORK_FACTOR = 10;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt,null, function(err, hash){
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
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
