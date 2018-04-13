'use strict';

const config = require('../../config.js');
const fs = require('fs');

var content;

exports.certification = function(req,res){
	fs.readFile('./certs/ca.crt',function(err,cert){
		content=cert;
		res.status(200);
		res.end(content);

	}); 
}

exports.md5 = function(req,res){
	fs.readFile('./certs/md5.txt',function(err,cert){
		content=cert;
		res.status(200);
		res.end(content);
	}); 
}
