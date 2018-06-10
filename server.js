var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var os = require("os");
var util = require("util");
app.use(bodyParser.json());

app.listen(8888);

app.get('/',function(req,res){
    console.log("Test!");
    res.status(200);
    res.end("This is my API");


})
/*  app.use('/',function(req,res){
    var form = new multipart.Form();
    form.parse(req, function(err, fields, files){
        console.log(util.inspect({fields: fields, files:files}));
        Object.keys(files).forEach(function(name){
            console.log(name);
        })
    })
    console.log(Date.now()/1000);
    next();
}) */
var routes = require('./api/routes/routermanagerroutes');
routes(app);


console.log("Server listening");