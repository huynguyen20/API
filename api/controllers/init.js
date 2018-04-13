'use strict';

const server_ip="";

var mongo=require('mongodb');
var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/test";
var util = require('util');
var app = require('express');

exports.initdevice = function(req,res){
	console.log("device initialize");
	console.log(req.query.mac);
	var response_object={};

	
	response_object.username='test';
    response_object.password='test';
    //todo:Token creation function
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
	res.json(response_object);		
	
}