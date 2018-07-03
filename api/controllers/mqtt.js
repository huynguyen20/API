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
    msg_object.id=jobid+"";
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
    var mac=req.body.mac;
    var topic='listen/topic/topic/'+mac;
    var type="msg";
    console.log(topic);
    var cmd='';
    var infno='';
    if(req.body.type=="wireless"){
        var radio=req.body.radio;
        console.log(infno);
        if(req.body.ssid){
            cmd+="uci set wireless.default_"+radio+".ssid='"+req.body.ssid+"'";
        }
        if(req.body.passwd){
            cmd+=" && uci set wireless.default_"+radio+".key='"+req.body.passwd+"'";
        }
        if(req.body.channel){
            cmd+=" && uci set wireless."+radio+".channel='"+req.body.channel+"'";
        }
        if(req.body.encryption){
            cmd+=" && uci set wireless.default_"+radio+".encryption='"+req.body.encryption+"'";
        }
        cmd+=" && uci commit wireless && /etc/init.d/network reload";
        publishCommand(cmd,topic,type);
    }   
    if(req.body.type=="dhcp"){
        infno=req.body.network;
        
        if(req.body.start){
            cmd="uci set dhcp."+infno+".start="+req.body.start;
        }
        if(req.body.limit){
            cmd+=" && uci set dhcp."+infno+".limit="+req.body.limit;
        }
        if(req.body.time){
            cmd+=" && uci set dhcp."+infno+".leasetime="+req.body.time;
        }
        cmd+=" && uci commit dhcp && /etc/init.d/dnsmasq reload";
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
 
    res.redirect("http://10.71.1.75/index.html");
    res.status(200);
    res.end();
}

exports.sendMultipleDevice = function(req,res){
    var macArray=req.body.mac,topic,type='msg',cmd='';
    var commands=req.body.command;
    if (commands.indexOf('\r\n')!=-1){
        var cmdArray=req.body.command.split('\r\n');
        for (var j=0;j<cmdArray.length;j++){
            cmd=cmd+cmdArray[j];
            if (j<cmdArray.length-1){
                cmd=cmd+' && ';
            }
        }
    }
    else {
        cmd=commands;
    }
    if (typeof macArray!="string"){
        for (var i=0;i<macArray.length;i++){
            topic='listen/topic/topic/'+macArray[i];          
            publishCommand(cmd,topic,type);
        }
    }
    else{
        topic='listen/topic/topic/'+macArray;
            publishCommand(cmd,topic,type);
    }
    res.redirect("http://10.71.1.75/index.html");
    res.end("OK");
}
