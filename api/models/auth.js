'use strict';

var jtoken = require('jsonwebtoken');
var config = require('../../config.js');

exports.createToken = function(value){
    var token = jtoken.sign(value,config.secret);
    return token;
}

exports.authentication = function(req,res,next){
	var token=req.query.access_token;
	jtoken.verify(token,config.secret,function(err,decoded){
		if (err){
			res.status(401);
			res.end("Unauthorized!!");
		}
		else{
			console.log("Authorized!");
			next();
		}

	});

}