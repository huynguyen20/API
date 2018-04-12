var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());

app.listen(8888);

var routes = require('./api/routes/routermanagerroutes');
routes(app);


console.log("Server listening");