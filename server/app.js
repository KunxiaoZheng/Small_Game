
/**
 * Module dependencies.
 */

var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Test=require('./model/test');
var CharInfo=require('./model/charInfo');

mongoose.connect('mongodb://localhost/wxapp');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));

app.get('/', function(req,res){
	CharInfo.find({})
	.exec(function(err,userInfos){
		if(err){
			res.send('error');
		}else{
			res.json(userInfos);
		}
	})
});

app.get('/:id',function(req,res){
	CharInfo.findOne({
		_id:req.params.id
	}).exec(function(err,user){
		if(err){
			res.send('error');
		}else{
			res.json(user);
		}
	})
});

app.post('/update/:id',function(req,res){
		console.log(req.body.str);
	CharInfo.findOneAndUpdate({
		_id:req.params.id
	},
	{str_value:4},
	function(err,user){
		if(err){
			console.log("fail");
			res.send('error');
		}else{
			console.log("success");
			res.send(user);
		}
	});
});

app.listen(3000);
console.log('running on port 3000');


