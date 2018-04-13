'use strict';

const server_ip="";

var mongo=require('mongodb');
var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/test";
var util = require('util');
var app = require('express');

exports.distributedata = function(req,res){
	console.log("GET REQ");
	MongoClient.connect(url, function( err, db){
		if (err) {
			console.log(err);
		} else {
			var collection = db.collection('routers');
			collection.find({},{"device.mac":1,"device.machine_type":1}).toArray( function( err, result){
			for (var i=0; i < result.length; i++){
					console.log(result[i]);
				}
			res.header("Access-Control-Allow-Origin", "*");
			res.json(result);	
			});
		}
	});
}

exports.getdeviceinfobyid = function(req,res){
	console.log("Get Device Info Req");
	MongoClient.connect(url, function(err, db){
		if(err) {
			console.log(err);
		} else {
			var collection = db.collection('routers');
			var id = mongo.ObjectID(req.params.id.split(':')[1]);
			console.log(id);
			collection.findOne({'_id':id},function( err, result){
				if (err) {
					console.log(err);
				} else if(result) {
					console.log(result);
					res.json(result);
				} else {
					res.status(404);
					res.end();				
				}	
			});  
		}
	});
}
