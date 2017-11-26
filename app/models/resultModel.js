
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resultSchema = new Schema({
userEmail:  {type:String} , 
testName:  {type:String} , 
testUID:  {type:String} , 
testTime: {type:String} ,
testCurrentDate: {}  ,
testResult:  {type:String} ,
testWronAnswer:   {type:String} ,
testCorrectAnswer :{}
	});

mongoose.model('resultModel',resultSchema);