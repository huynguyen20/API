var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var os = require("os");
var util = require("util");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8888);

app.post('/test',function(req,res){
    console.log(req.body);
    res.status(200);
    res.end("OK");


})

var routes = require('./api/routes/routermanagerroutes');
routes(app);


console.log("Server listening");