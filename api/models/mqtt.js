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


exports.sendCommand = function(req,res){

    //TAO MESSAGE PAYLOAD
    var msg_object={};
    var meta_object={};
    msg_object.id=jobid;
    msg_object.timestamp=Date.now();
    meta_object.msg=req.body.cmd;
    meta_object.type=req.body.type;
    msg_object.meta=meta_object;
    var msg = JSON.stringify(msg_object,null,' ');

    jobid++;
    //MQTT

    var client = mqtt.connect(broker);
    client.on('connect', function () {
        client.subscribe('result');
    });
    client.on('message', function (topic, message) {
        console.log('RECEIVED from Topic' + topic + ':\n' + message.toString());
        //Xu ly
        client.end();
    });
    client.on('error', function (err) {
        console.log(err.toString());
    });
    client.publish('test', msg);
    console.log('PUBLISH to Topic test:\n' + msg);
    res.status(200);
    res.end('OKE');
}