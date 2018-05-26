var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());

app.listen(8888);
app.post('/',function(req,res){
    res.status(200);
    console.log(req);
    res.end("This is an API");
})
var routes = require('./api/routes/routermanagerroutes');
routes(app);


console.log("Server listening");