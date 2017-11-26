
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
	testName  :  {type:String} ,
	testTime : {type:String},
	testAnswer 		: {type:String},
	testDetails: {}
	});

mongoose.model('AdminModel',adminSchema);