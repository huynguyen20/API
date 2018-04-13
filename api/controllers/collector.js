'use strict';

const config = require('../../config.js');

var mongo=require('mongodb');
var MongoClient = mongo.MongoClient;
var util = require('util');
var router = require('express').Router();
var jswt = require('jsonwebtoken');

exports.authentication = function(req,res,next){
	var token=req.query.token;
	jswt.verify(token,config.secret,function(err,decoded){
		if (err){
			res.status(401);
			res.end("Unauthorized!!");
		}
		else{
			console.log("Authorized!");
			console.log("device try to update");
    console.log(req.query.token);
	MongoClient.connect(config.mongo_URL, function (err, db){
		if(err) throw err;
		var devmac = req.body.device.mac;
		console.log(devmac);
		db.collection("routers").findOne({"device.mac":devmac},function(err,result){
			if(err) throw err;
			if(result) {
				db.collection("routers").updateOne({"device.mac":devmac},req.body, function(err,res){
					if (err) throw err;
					console.log("Updated 1 device");
				});
			}
			else {
				db.collection("routers").insertOne(req.body, function(err,res){
					if (err) throw err;
					console.log("Insert New Device");
				});
			}
		});
	});
	res.end();
		}

	});


}

/* exports.collectdatas = function (req,res){
    console.log("device try to update");
    console.log(req.query.token);
	MongoClient.connect(config.mongo_URL, function (err, db){
		if(err) throw err;
		var devmac = req.body.device.mac;
		console.log(devmac);
		db.collection("routers").findOne({"device.mac":devmac},function(err,result){
			if(err) throw err;
			if(result) {
				db.collection("routers").updateOne({"device.mac":devmac},req.body, function(err,res){
					if (err) throw err;
					console.log("Updated 1 device");
				});
			}
			else {
				db.collection("routers").insertOne(req.body, function(err,res){
					if (err) throw err;
					console.log("Insert New Device");
				});
			}
		});
	});
	res.end();
}; */