/**
 * http://usejsdoc.org/
 */
var mongoose= require('mongoose');

var testSchema=mongoose.Schema({
	name:{
		type:String,
		require:true
	},
});


var Test = module.exports= mongoose.model('Test',testSchema,'test');

module.exports.getTest =function(callback,limit){
	Test.find(callback).limit(limit);
}