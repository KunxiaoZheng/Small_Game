
/**
 * Module dependencies.
 */

var express = require('express')
var app = express();
var bodyPaser = require('body-parser');
var mongoose = require('mongoose');

var Test=require('./model/test');

mongoose.connect('mongodb://localhost/wxapp');
var db = mongoose.connection;



app.get('/', function(req,res){
	Test.getTest(function(err,test){
		if(err){
			throw err;
		}
		res.json(test);
	})
});

app.listen(3000);
console.log('running on port 3000');


