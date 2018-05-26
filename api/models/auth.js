'use strict';

var jtoken = require('jsonwebtoken');
var config = require('../../config.js');

exports.createToken = function(mac){
    var token = jtoken.sign(mac,config.secret);
    return token;
}

exports.authentication = function(req,res,next){
	console.log(req);
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