'use strict';

const server_ip="";

var mongo=require('mongodb');
var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/test";
var util = require('util');
var app = require('express');

exports.collectdatas = function (req,res){
	console.log("device try to update");
	MongoClient.connect(url, function (err, db){
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
};