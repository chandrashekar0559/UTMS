// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '378193962628814', // your App ID
		'clientSecret' 	: '5a495a6090cedf449958b5362d7d54d2', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},
    'googleAuth' : {
		'clientID' 		: '673184218402-pg0lk29k5fk3m2nuj54pus9algdqd93q.apps.googleusercontent.com',// your App ID
		'clientSecret' 	: 'ReGa4xJ2a9qikvVusAA6-AOn', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/google/callback'
	}

};