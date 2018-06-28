'use strict';

const config = require('../../config.js');


var mongo=require('mongodb');
var MongoClient = mongo.MongoClient;
var util = require('util');
var app = require('express');

exports.distributedata = function(req,res){
	console.log("GET REQ");
	MongoClient.connect(config.mongo_URL, function( err, db){
		if (err) {
			console.log(err);
		} else {
			var collection = db.collection('routers');
			collection.find({},{"device.mac":1,"device.machine_type":1,"device.wan_ip":1,"device.created_at":1}).toArray( function( err, result){
				res.header("Access-Control-Allow-Origin", "*");
				res.json(result);	
			});
		}
	});
}

exports.getdeviceinfobymac = function(req,res){
	console.log("Get Device Info Req");
	res.header("Access-Control-Allow-Origin", "*");
	MongoClient.connect(config.mongo_URL, function(err, db){
		if(err) {
			console.log(err);
		} else {
			var collection = db.collection('routers');
			console.log(req.params.mac.split(':')[1]);
			var mac = req.params.mac.split(':')[1];
			collection.findOne({'device.mac':mac},function( err, result){
				if (err) {
					console.log(err);
				} else if(result) {
					res.json(result);
				} else {
					res.status(404);
					res.end();				
				}	
			});  
		}
	});
}
