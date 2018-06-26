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
    port: config.mqtt_port,
    username: 'root',
    password: 'root',
    protocol: 'mqtts',
    protocolID: 'MQlsdp',
    ca: cafile,
    rejectUnauthorized: false,
};
var client = mqtt.connect(broker);

var publishCommand=function(cmd,top,type){
    if (cmd=="") return false;
    var msg_object={};
    var meta_object={};
    var command_meta='';
    msg_object.id=jobid;
    msg_object.timestamp=Date.now();
    meta_object.msg=cmd;
    if(type){
        meta_object.type=type;
    }
    msg_object.meta=meta_object;
    var msg = JSON.stringify(msg_object,null,' ');
    client.publish(top, msg);
    jobid++;
    console.log('PUBLISH to Topic '+top+':\n' + msg);

}
exports.sendSingleCommand = function(req,res){
    var mac=req.headers.referer.split('?')[1],type='msg';
    var topic='listen/topic/topic/'+mac;
    console.log(req.body);
    var cmd='';
    var infno=req.body.interface.split('wlan')[1];
    console.log(infno);
    if(req.body.ssid){
        cmd="uci set wireless.@wifi-iface["+infno+"].ssid="+req.body.ssid+"' && uci commit wireless && /etc/init.d/network reload";
        publishCommand(cmd,topic,type);
    }
    if(req.body.passwd){
        cmd="uci set wireless.@wifi-iface["+infno+"].key='"+req.body.passwd+"' && uci commit wireless && /etc/init.d/network reload";
        publishCommand(cmd,topic,type);
    }
    if(req.body.channel){
        //Not working yet
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
 
    res.redirect("http://localhost/list.html");
    res.status(200);
    res.end();
}

exports.sendMultipleDevice = function(req,res){
    var macArray=req.body.mac,topic,type='msg',cmd='';
    var cmdArray=req.body.command.split('\r\n');
    if (typeof macArray!="string"){
        for (var i=0;i<macArray.length;i++){
            topic='listen/topic/topic/'+macArray[i];
            for (var j=0;j<cmdArray.length;j++){
                cmd=cmd+cmdArray[i];
                if (j<cmdArray.length-1){
                    cmd=cmd+' && ';
                }
            }
            publishCommand(cmd,topic,type);
        }
    }
    else{
        topic='listen/topic/topic/'+macArray;
        for (var j=0;j<cmdArray.length;j++){
            cmd=cmdArray[i];
            publishCommand(cmd,topic,type);
        }
    }
    res.redirect("http://localhost/list.html");
    res.end("OK");
}