'use strict';

const config = require('../../config.js');
const mongo = require('mongodb');
const multiparty = require ('multiparty');

var MongoClient = mongo.MongoClient;
var util = require('util');
var router = require('express').Router();

exports.collectdata = function (req,res){
	console.log("device try to update");
	var form = new multiparty.Form();

/* 	form.parse(req.body, function(err, fields, files){
		form.on(files,function(name,filename,path,headers,size){
			console.log(name,filename);
		})
		zlib.Unzip(files.data,function(err,req.body){
			if (err) throw err;
			else{ */
				MongoClient.connect(config.mongo_URL, function (err, db){
					if(err) throw err;
					if (req.body.device.mac && req.body.device.machine_type)	{
						let devmac = req.body.device.mac;
						console.log(devmac);
						db.collection("routers").findOne({"device.mac":devmac},function(err,result){
							if(err) {
								res.status(400);
								res.end("Error");
								throw err;		
							//	zlib.close();		
							}
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
					}
					else {
						res.status(400);
						res.end("ERROR DATA");
					}
				});
				res.end();
	
/* 			}
			})
	}) */



	
};