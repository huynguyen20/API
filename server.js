var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var os = require("os");
var util = require("util");
var user=require('./api/controllers/user');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8080);

app.post('/test',function(req,res){
    console.log(req.body);
    res.status(200);
    res.end("OK");


})

//app.use('/user/',user.requiresLogin);

var routes = require('./api/routes/routermanagerroutes');
routes(app);


console.log("Server listening");