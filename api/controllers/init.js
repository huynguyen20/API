'use strict';


const config = require('../../config.js');
const auth = require('../models/auth.js');
const apiCollectorUrl=config.ip+'/collector';

exports.initdevice = function(req,res){
	console.log("device initialize");
	console.log(req.query.mac);
	var response_object={};

	response_object.username='test';
    response_object.password='test';
    //todo:Token creation function
	response_object.token=auth.createToken(req.query.mac);
	response_object.mac=req.query.mac;
	response_object.api_url=apiCollectorUrl;
	response_object.stats_url=apiCollectorUrl;
	response_object.sleep=30;
	response_object.monitor=15;
	response_object.scan=1;
	response_object.survey=0;
	response_object.tls="false";
	response_object["no-cache"]=1;
	
	var response_string=JSON.stringify(response_object);
	res.json(response_object);		
    
}