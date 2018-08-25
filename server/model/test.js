/**
 * http://usejsdoc.org/
 */
var mongoose= require('mongoose');

var charSchema=mongoose.Schema({
	name:String,
	char_stat:{
		
	},
});


var Test = module.exports= mongoose.model('Test',charSchema,'test');

module.exports.getTest =function(callback,limit){
	Test.find(callback).limit(limit);
}