'use strict';

var splash_model=require('../models/splash-model');
var j;
exports.getUserList = function(req,res){
    var resp_obj=[],i,user,buffer={};
    var statement="SELECT username FROM radcheck WHERE attribute='Cleartext-Password'";
    res.header("Access-Control-Allow-Origin", "*");
    splash_model.query(statement,function(userlist){
        res.json(userlist);
        res.end(); 
    });
        
   
}

exports.getUserDetails = function(req,res){
    var user=req.params.user.split(':')[1];
    var obj={};
    res.header("Access-Control-Allow-Origin", "*");
    var statement="SELECT attribute,value FROM radcheck WHERE username='"+user+"'";
    user=user.replace(/[^a-z0-9]/gi, '');
    splash_model.query(statement,function(userdetails){
        for (j in userdetails){
            obj[userdetails[j].attribute.replace(/[^a-z0-9]/gi, '')]=userdetails[j].value;
        }
        res.json(obj);
        res.end();
    }); 
}

exports.editUser = function(req,res){
    console.log(req.body);
     var statement,user=req.body.username;
    user = user.replace(/[^a-z0-9]/gi, '');
    if (req.body.password){
        statement="UPDATE radcheck SET value='"+req.body.password+"' WHERE username='"+user+"' AND atrribute='Cleartext-Password'";
        splash_model.query(query)
    }
    if (req.body.expiration){
        statement="UPDATE radcheck SET value='"+req.body.expiration+"' WHERE username='"+name+"' AND atrribute='Expiration'";
    } 
}
exports.addUser = function(req,res){
    console.log(req.body);
    var statement='',user=req.body.username;
     user = user.replace(/[^a-z0-9]/gi, '');
    statement="INSERT INTO radcheck (username,attribute,value) VALUES ('"+user+"','Cleartext-Password','"+req.body.password+"')";
    splash_model.query(statement,null);
    statement="INSERT INTO radcheck (username,attribute,value) VALUES ('"+user+"','Max-Daily-Session','"+req.body.maxdailysession+"')";
    splash_model.query(statement,null);
    statement="INSERT INTO radcheck (username,attribute,value) VALUES ('"+user+"','Expiration','"+req.body.expiration+"')";
    splash_model.query(statement,null); 
    res.end("OK!");
}