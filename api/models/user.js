var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var config = require('../../config');

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
  devices: {
    type: Array,
    items: {
      type: String,
    }
  }
  
});

UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      console.log(err);
      return err;
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