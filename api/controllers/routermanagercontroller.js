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

exports.initdevice = function(req,res){
	console.log("device initialize");
	console.log(req.query.mac);
	var response_object={};

	
//	res.end(response_object);
	response_object.username='test';
	response_object.password='test';
	response_object.token='75199254-5ab0-4fce-a8fc-e16b1978b103';
	response_object.mac=req.query.mac;
	response_object.api_url="http://103.88.123.103:8888/collector";
	response_object.stats_url="http://103.88.123.103:8888/collector";
	response_object.sleep=30;
	response_object.monitor=15;
	response_object.scan=1;
	response_object.survey=0;
	response_object.tls="false";
	response_object["no-cache"]=1;
	
	var response_string=JSON.stringify(response_object);
//	res.status(200);
	res.json(response_object);		
	
}

exports.certification = function(req,res){
	var cert = "-----BEGIN CERTIFICATE-----\r\nMIIDXTCCAkWgAwIBAgIJAK5V+cWPaKYjMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNVBAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQwHhcNMTgwMzA5MDMyOTAyWhcNMjMwMzA5MDMyOTAyWjBFMQswCQYDVQQGEwJBVTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAn2UdZU7234NXdwaz2Ipb5LH54CxI5lP1N4b4sINzmW2vX42eBpFU6JYEerV1RyBpq7nMFqBxuxZXpsGYzZyhntX/292aQIrfR4SE1EaJ0oZeFFi341mBegkybEOEKTgJiWfm2wwA4+3dq8uFMaaIQdB1vGxC/U/kCBf+7Va5LJV4IZM3zHda953q7u6fp1F13xN3FBf8avnVE5qM0KD+L5zl2Am4XB/Bp2QeVat36iXpU+r5XLq88veCdetQWfsOGIuxFobrVqzMDjO8IREVQWJ9KJDF+tO41jgAPBQBNqV90JEbFO7/VKhAZkIojWInvGB0a7+7wEHN88W00myalQIDAQABo1AwTjAdBgNVHQ4EFgQUAQixPyoDMvAGrNWaO1Ov3F3lq34wHwYDVR0jBBgwFoAUAQixPyoDMvAGrNWaO1Ov3F3lq34wDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAIEyKPfjbQsXTSdRvgMDfdXnRNR59aErsY5RwBN0Mp9m6UPGP0PG/0LpotcPrzW0mLhx2iDVI+kGFjSqjdGxlXpeT4ZNvFk0kdP/jTvn6TITqvfLi8rQ9N6w5Xjd5ttluYHD218o/8R/BoxnRXeYBz3ZmBnUU3tLZJr9eY9yr8U1UXx1fwucw/opb8maKSIWAi1p/bwJsfhsKJBUIhwyNDtPzW0KVIcjpXhndhYF/gXkKpXZyu+BUQqHbhUh7zuRek+Z/OtwyFXCSkJ509hpJ3EQuK7yi5nPd1n3SdQIUV/NKqAZz50XFUkdVOMoajjBqxLwozEC4TqJ6JyCNSxAeBw==\r\n-----END CERTIFICATE-----"
	res.status(202);
	res.end(cert);
}
