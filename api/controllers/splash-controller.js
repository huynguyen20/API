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
        console.log(obj);
        res.json(obj);
        res.end();
    }); 
}

exports.editUser = function(req,res){
    console.log(req.body);
     var statement,user=req.body.username;
    user = user.replace(/[^a-z0-9]/gi, '');
    if (req.body.password!=""){
        statement="UPDATE radcheck SET value='"+req.body.password+"' WHERE username='"+user+"' AND attribute='Cleartext-Password'";
        splash_model.query(statement);
    }
    if (req.body.expiration){
        statement="UPDATE radcheck SET value='"+req.body.expiration+"' WHERE username='"+user+"' AND attribute='Expiration'";
        console.log(statement);
        splash_model.query(statement);
    } 
    if (req.body.maxdailysession!=""){
        statement="UPDATE radcheck SET value='"+req.body.maxdailysession+"' WHERE username='"+user+"' AND attribute='Max-Daily-Session'";
        splash_model.query(statement);
    } 
    if (req.body.maxmonthlysession!=""){
        statement="UPDATE radcheck SET value='"+req.body.maxmonthlysession+"' WHERE username='"+user+"' AND attribute='Max-Monthly-Session'";
        splash_model.query(statement);
    } 
    if (req.body.logintime){
        statement="UPDATE radcheck SET value='"+req.body.logintime+"' WHERE username='"+user+"' AND attribute='Login-Time'";
        splash_model.query(statement);
    } 
    res.redirect("http://10.71.1.75/splash.html");
    res.end();
}
exports.addUser = function(req,res){
    console.log(req.body);
    var statement='',user=req.body.username;
    user = user.replace(/[^a-z0-9]/gi, '');
    statement="INSERT INTO radcheck (username,op,attribute,value) VALUES ('"+user+"','!=','Cleartext-Password','"+req.body.password+"')";
    splash_model.query(statement,null);
    if(req.body.maxdailysession){
        statement="INSERT INTO radcheck (username,op,attribute,value) VALUES ('"+user+"','!=','Max-Daily-Session','"+req.body.maxdailysession+"')";
        splash_model.query(statement,null);
    }  
    if(req.body.maxmonthlysession){
        statement="INSERT INTO radcheck (username,op,attribute,value) VALUES ('"+user+"','!=','Max-Monthly-Session','"+req.body.maxmonthlysession+"')";
        splash_model.query(statement,null);
    }
    var expiration="";
    var expirationdate=new Date(req.body.expiration);
    expiration+=splash_model.parsemonth(expirationdate.getMonth())+" "+expirationdate.getDate().toString()+" "+expirationdate.getFullYear().toString()+ " 00:00";
    statement="INSERT INTO radcheck (username,op,attribute,value) VALUES ('"+user+"','!=','Expiration','"+expiration+"')";
    splash_model.query(statement,null); 
    statement="INSERT INTO radcheck (username,op,attribute,value) VALUES ('"+user+"','!=','Login-Time','"+req.body.logintime+"')";
    splash_model.query(statement,null); 
    res.redirect("http://10.71.1.75/splash.html");
    res.end("OK!");
}