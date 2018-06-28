'use strict';


const config = require('../../config.js');
const auth = require('../models/auth.js');
const apiCollectorUrl=config.ip+'/collector';

exports.initdevice = function(req,res){
	console.log("device initialize");
	console.log(req.query.mac);
	var response_object={};

	response_object.username=config.mqtt_user;
    response_object.password=config.mqtt_password;
	response_object.token=auth.createToken(req.query.mac);
	response_object.mac=req.query.mac;
	response_object.api_url=apiCollectorUrl;
	response_object.stats_url=apiCollectorUrl;
	response_object.sleep=30;
	response_object.monitor=15;
	response_object.scan=1;
	response_object.survey=0;
	response_object.tls=1;
	response_object.cacrt="/root/ca.crt";
	response_object.topic=config.mqtt_topic_test;
	response_object.key=config.mqtt_key;
	response_object.mqtt_host=config.mqtt_host;
	response_object.port=config.mqtt_port;
	response_object.debug=1;
	response_object["no-cache"]=1;
	response_object.splash=0;
	var response_string=JSON.stringify(response_object,null,' ');
	res.end(response_string);	
    
}