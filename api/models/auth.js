'use strict';

var jtoken = require('jsonwebtoken');
var config = require('../../config.js');

exports.createToken = function(mac){
    var token = jtoken.sign(mac,config.secret);
    return token;
}