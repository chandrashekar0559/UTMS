
module.exports = function (app, passport) {

// show the home page (will also have our login links)
app.get('/', function (req, res) {
res.render('index.ejs', {user: req.user});
});

// PROFILE SECTION =========================
app.get('/profile', isLoggedIn, function (req, res) {

res.render('profile.ejs', {
user: req.user
});
});

//Contact number =======================
app.get('/contact',  function (req, res) {
res.render('contact.ejs');
});

// LOGOUT ==============================
app.get('/logout', function (req, res) {
req.logout();
res.redirect('/');
});
// LOGIN ===============================
// show the login form
app.get('/login', function (req, res) {
	var currentUser = req.user;
if (!currentUser) {
res.render('login.ejs', {message: req.flash('loginMessage')});
} else {
	if (req.user.local.email == 'admin@gmail.com') {
res.redirect('/admin');
	}else{
res.redirect('/dashboard');
	}
	
}
	
});

var User = require('../app/models/user');

app.get('/dashboard/:email', function (req, res) {
var currentUser = req.user;
if (!currentUser) {
res.redirect('/login');
} else {
if (req.user.local.email == 'admin@gmail.com') {
res.render('dashboard.ejs', {user: req.user});
	}else{
res.redirect('/dashboard');
	}
}

});


app.get('/dashboard', function (req, res) {
var currentUser = req.user;
if (!currentUser) {
res.redirect('/login');
} else {
if (req.user.local.email == 'admin@gmail.com') {
res.redirect('/admin');
	}else{
res.render('dashboard.ejs', {user: req.user});
	}
}

});

// process the login form
app.post('/login', passport.authenticate('local-login', {
successRedirect: '/dashboard', // redirect to the secure profile section
failureRedirect: '/login', // redirect back to the signup page if there is an error
failureFlash: true // allow flash messages
}));
// LOGIN ===============================
// show the login form
app.get('/forgotpassword', function (req, res) {
res.render('forgotpassword.ejs', {message: req.flash('forgotMessage')});
});

// process the login form
app.post('/forgotpassword', passport.authenticate('local-forgotpassword', {
successRedirect: '/profile', // redirect to the secure profile section
failureRedirect: '/forgotpassword', // redirect back to the signup page if there is an error
failureFlash: true // allow flash messages
}));
//ALL USERS ===============================
app.get('/adminLU', isLoggedIn, function (req, res) {
if (req.user.local.email == 'admin@gmail.com') {
res.render('adminLU.ejs');
} else {
res.render('admin.ejs', {
user: req.user
})
}
});
app.get('/listOfUsers', isLoggedIn, function (req, res) {
User.find(function (err, result) {
if (err) {
res.send(err)
} else {
res.send(result)
}
})
});
//Test Taken page ===============================
app.get('/testtaken/:id', isLoggedIn, function (req, res) {
var currentUser = req.user;
// console.log("User" + currentUser)
if (!currentUser) {
res.redirect('/login');
} else {
if (req.user.local.email == 'admin@gmail.com') {
res.redirect('/admin');
		}else{

res.render('testtaken.ejs' , {
user: req.user
} );

	}
}

});
app.get('/testdetails/:id', function (req, res) {
adminModel.findOne({'_id': req.params.id}, function (err, result) {
if (err) {
console.log("error-" + req.params.id)
res.send(err)
} else {
console.log(result)
res.send(result)
}
})
});

// SIGNUP =================================
// show the signup form
app.get('/signup', function (req, res) {
	var currentUser = req.user;
if (!currentUser) {
res.render('signup.ejs', {message: req.flash('signupMessage')});
} else {
if (req.user.local.email == 'admin@gmail.com') {
res.redirect('/admin');

	}else{
res.redirect('/dashboard');
	}
	
}
});

// process the signup form
app.post('/signup', passport.authenticate('local-signup', {
successRedirect: '/profile', // redirect to the secure profile section
failureRedirect: '/signup', // redirect back to the signup page if there is an error
failureFlash: true // allow flash messages
}));
// ADMIN =================================
// show the Admin Page
app.get('/admin', isLoggedIn, function (req, res) {
if (req.user.local.email == 'admin@gmail.com') {
res.render('admin.ejs', {message: req.flash('adminMessage')});
} else {
res.redirect('/profile');
}
});

mongoose = require('mongoose');

var admModel = require('../app/models/adminModel');
var resltModel = require('../app/models/resultModel');

var adminModel = mongoose.model('AdminModel');
var resultModel =mongoose.model('resultModel');
// process the Admin ============================================================================ 
app.post('/adminCreate', function (req, res) {
// console.log('testName--' + req.body.testName + 'testTime--' + req.body.testAnswerstTime + 'testDetails--' + req.body.testDetails);
var newTest = new adminModel({
testName: req.body.testName,
testTime: req.body.testTime,
testDetails: req.body.testDetails,
});
newTest.save(function (error) {
if (error) {
console.log(error);
res.render('admin.ejs', {message: req.flash('adminMessage')});
return done(null, false, req.flash('adminMessage', 'Oops! Something went Wrong.'));
// res.send(error);
} else {
console.log(newTest);
res.send(newTest);
}
});

});
app.get('/adminVU', isLoggedIn, function (req, res) {
if (req.user.local.email == 'admin@gmail.com') {
res.render('adminVU.ejs');
} else {
res.redirect('/profile');
}
});

app.get('/listOfTests', function (req, res) {
adminModel.find(function (err, result) {
if (err) {
res.send(err)
} else {
res.send(result)
}
})
});
app.post('/adminDelteTest/:id', function (req, res) {
adminModel.remove({'_id': req.params.id}, function (err, result) {
console.log("delete-error" + req.params.id);
if (err) {
res.send(err)
} else {
console.log(result)
res.send("Delted!!" + result)
}

});

});

app.get('/admin/:testName', function (req, res) {
// console.log("req.testName" + req.body.testName + "/////" + req.params.testName);
adminModel.findOne({'testName': req.params.testName}, function (err, result) {
console.log(result)
res.send(result);
})
});



app.get('/adminUpdate/:id', function (req, res) {
adminModel.findOne({'_id': req.params.id}, function (err, result) {
if (err) {
console.log("error-" + req.params.id)
// res.send(err)
} else {
console.log(result)
// res.send(result)
res.render('adminUpdate.ejs', {result: result});
}

})
// console.log(res);
});




app.post('/adminUpdate/:id', function (req, res) {
// console.log("com")
var update = req.body;
adminModel.findByIdAndUpdate({'_id': req.params.id}, update, function (err, result) {
if (err) {
console.log("error-" + req.params.id)
res.send(err)
} else {
console.log(result)
res.send(result)
}

})
});
//Admin precess End
// process the Result ============================================================================ 
app.post('/testResult', function (req, res) {
	// console.log(req.body.testCurrentDate +"--"+req.body.testCorrectAnswer+"--"+req.body.testResult+"--"+req.body.testWronAnswer);
var newResult = new resultModel({
userEmail:req.body.userEmail ,
testName: req.body.testName ,
testTime: req.body.testTime ,
testCurrentDate : req.body.testCurrentDate ,
testCorrectAnswer: req.body.testCorrectAnswer ,
testResult : req.body.testResult ,
testWronAnswer: req.body.testWronAnswer
});
newResult.save(function (error) {
if (error) {
console.log(error);
res.send(error);
} else {
console.log(newResult);
res.send(newResult);
}
});

});

app.get('/testResult', function (req, res) {
	// console.log(req.params.email)
resultModel.find(function (err, result) {
if (err) {
// console.log("error-" + req.params.email)
console.log("error-"+err)
res.send(err)
} else {
console.log("result--"+result)
res.send(result)
}
})
});


app.get('/result/:userEmail/:testName',isLoggedIn ,function (req, res) {
res.render('result.ejs', {
user: req.user
} );

});

app.get('/taketest',isLoggedIn ,function (req, res) {
var currentUser = req.user;
console.log("User" + currentUser)
if (!currentUser) {
res.redirect('/login');
} else {
if (req.user.local.email == 'admin@gmail.com') {
res.redirect('/admin');
	}else{
res.render('tackatest.ejs', {
user: req.user
} );

	}
}

});

app.get('/testResult/:userEmail/:testName', function (req, res) {
	// console.log(req.params.userEmail+"--"+req.params.testName)
resultModel.find({'userEmail': req.params.userEmail , 'testName': req.params.testName},function (err, result) {
if (err) {
console.log("error-" + req.params.userEmail)
console.log("error-"+err)
res.send(err)
} else {
console.log("result--"+result)
res.send(result)
// res.render('result.ejs');
}
})
});
app.get('/testResult/:userEmail', function (req, res) {
	// console.log(req.params.userEmail)
resultModel.find({'userEmail': req.params.userEmail},function (err, result) {
if (err) {
console.log("error-" + req.params.userEmail)
console.log("error-"+err)
res.send(err)
} else {
console.log("result--"+result)
res.send(result)
}
})
});


app.post('/testResult/:id', function (req, res) {
resultModel.remove({'_id': req.params.id}, function (err, result) {
console.log("delete-error" + req.params.id);
if (err) {
res.send(err)
} else {
console.log(result)
res.send("Delted!!" + result)
}

});

});

// End process the Result ============================================================================ 

// facebook -------------------------------
app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

app.get('/auth/facebook/callback',
passport.authenticate('facebook', {
successRedirect: '/profile',
failureRedirect: '/'
}));

// google ---------------------------------
app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
app.get('/auth/google/callback',
passport.authenticate('google', {
successRedirect: '/profile',
failureRedirect: '/'
}));


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
if (req.isAuthenticated())
return next();

res.redirect('/');
}