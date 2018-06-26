var mongoose = require('mongoose');
var User = require('../models/user');
var config = require('../../config');
var bcrypt = require('bcrypt-nodejs');
var auth = require('../models/auth');
var jwt = require('jsonwebtoken');

exports.requiresLogin = function (req, res, next) {
	if (req.session && req.session.token) {
	  return next();
	} else {
	  var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    res.status(401);
    res.redirect('/login.html');
    res.end('Unauthorized');
	  return next(err);
	}
  }

exports.Register = function(req,res){
  mongoose.connect(config.mongo_URL);
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {
        var userData = {
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          passwordConf: req.body.passwordConf,
        }
        //use schema.create to insert data into the db
        User.create(userData, function (err, user) {
          if (err) {
            return next(err)
          } else {
            return res.redirect('/login.html');
          }
        });
      }
}

exports.Login = function(req,res){
  var username=req.username;
  var password=req.password;
  mongoose.connect(config.mongo_URL);
  User.findOne({username: req.username})
    .exec(function(err,user){
      if(err) 
      {
        return err;
      }
      else if (!user) {
        var err = new Error('User not found');
        err.status=401;
        return err;
        res.status(401);
        res.end('User not found!');
      } 
      bcrypt.compare(password,user.password,function (err, result){
        if (result === true){
          var token=jwt.sign(user._id,config.secret,{ expiresInMinutes: 30 });
          res.json({
            success: true,
            token: token
          });
        }
      })
    })
}