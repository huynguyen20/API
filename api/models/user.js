var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  }
});

UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });

var User = mongoose.model('User', UserSchema);

var SessionSchema = new mongoose.Schema({
    token: {
        type: String,
    },
    salt: {
        type: String,
    }
})
var Session = mongoose.model('Session',SessionSchema);
module.exports = User,Session;