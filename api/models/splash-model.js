'use strict';
var mysql = require('mysql');
var ress;
var con = mysql.createConnection({
    host: "10.71.1.75",
    user: "root",
    password: "root",
    database: "radius",
    port: 23,
});

exports.query = function(statement,callback){
        console.log("MYSQL Connected!");
        con.query(statement,function(err, result){
            if (err) {
                console.log(err);
                return err;
            }
            ress=result;
            if (callback) {
                callback(ress);
            }
            
        })

}

exports.getDetails=function(username, callback){
    var user=username.replace(/[^a-z0-9]/gi, '');
    var statement="SELECT attribute,value FROM radcheck WHERE username='"+user+"'";
    query(statement,callback);

}