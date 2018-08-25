/**
 * http://usejsdoc.org/
 */
var mongoose= require('mongoose');

var charSchema=mongoose.Schema({
	name:String,
	info:{
	str_value:Number,
	int_value:Number,
	money_value:Number,
	}
});


var CharSchema = module.exports= mongoose.model('CharSchema',charSchema,'charInfo');

