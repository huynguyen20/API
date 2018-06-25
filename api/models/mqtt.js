'use strict';

var mqtt = require('mqtt');
var fs = require('fs');
const config = require('../../config');
const server = require('../../server.js');
global.jobid = 1;


var timeStampInMs = Date.now();

var cafile = fs.readFileSync('./certs/ca.crt');
var broker = {
    host: config.mqtt_host,
    port: 8883,
    username: 'root',
    password: 'root',
    protocol: 'mqtts',
    protocolID: 'MQlsdp',
    ca: cafile,
    rejectUnauthorized: false,
};
var client = mqtt.connect(broker);

var publishCommand=function(cmd,top,type){
    var msg_object={};
    var meta_object={};
    var command_meta='';
    msg_object.id=jobid;
    msg_object.timestamp=Date.now();
    meta_object.msg=cmd;
    meta_object.type=type;
    msg_object.meta=meta_object;
    var msg = JSON.stringify(msg_object,null,' ');
//    client.publish(topic, msg);
    jobid++;
    console.log('PUBLISH to Topic '+top+':\n' + msg);

}
exports.sendSingleCommand = function(req,res){
    var mac=req.headers.referer.split('?')[1];
    var topic='test/'+mac;
    console.log(req.body);
     res.end("OK");
    var cmd='';
    
    if(req.body.ssid){
        //Command to set SSID goes here, set cmd var
        publishCommand(cmd,topic,type);
    }
    if(req.body.passwd){
        //Command to set password goes here
        publishCommand(cmd,topic,type);
    }
    if(req.body.channel){
        //Command to set channel goes here
        publishCommand(cmd,topic,type);
    }
    
    
    //MQTT

 
/*     client.on('connect', function () {
        client.subscribe('result');
    });
     client.on('message', function (topic, message) {
        console.log('RECEIVED from Topic' + topic + ':\n' + message.toString());
        //Xu ly
        client.end();
    }); */
    client.on('error', function (err) {
        console.log(err.toString());
    }); 
 
    
    res.status(200);
    res.end('OKE'); 
}

exports.sendMultipleDevice = function(req,res){
    var macArray=req.body.mac,topic,type='test',cmd;
    var cmdArray=req.body.command.split('\r\n');
    for (var i=0;i<macArray.length;i++){
        topic='test/'+macArray[i];
        for (var j=0;j<cmdArray.length;j++){
            cmd=cmdArray[i];
            publishCommand(cmd,topic,type);
        }
    }
    res.end("OK");
}
