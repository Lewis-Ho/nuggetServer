var express = require('express');
var path = require('path');
var port = process.env.PORT || 8008;
var app = express();
var fs = require('fs');
var csv = require('csvtojson');
var firebase = require("firebase");
var config = require("./config/config.json");

var order = require(path.join(__dirname, 'controllers', 'order'));


firebase.initializeApp(config.Firebase);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'index.html'))
});

app.get('/status', (req, res) => {
	res.status(200).send("<status>OK</status>");

	var mysql      = require('mysql');
	var connection = mysql.createConnection(config.nuggetDb);

	connection.connect(function(err) {
	  if (err) {
	    console.error('error connecting: ' + err.stack);
	    return;
	  }

	  console.log('connected as id ' + connection.threadId);
	});



// working example
	// var mysql      = require('mysql');
	// var connection = mysql.createConnection(config.nuggetDb);
	//
	// connection.connect();
	//
	// connection.query('SELECT * FROM nuggetdb.Order', function (error, results, fields) {
	// 	console.log('return')
	// 	console.log(results)
	// 	if (error) throw error;
	// 	// console.log('The solution is: ', results[0].solution);
	// });
	//
	// connection.end();
});


app.get('/order/all', order.getAllOrders);


app.get('/login', (req, res) => {
	console.log('login')
	var email = 'yiucheung.ho@gmail.com';
	var password = 'Dream12345';

	firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
		res.status(200);
		res.send('User Login Successfully')
	}).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
		res.status(500)
		res.send(errorMessage)
	});
});

app.get('/logout', (req, res) => {
	console.log('logout')
	var email = 'yiucheung.ho@gmail.com';
	var password = 'Dream12345';

	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    // User is signed in.
			console.log(user)
	    // var displayName = user.displayName;
	    // var email = user.email;
	    // var emailVerified = user.emailVerified;
	    // var photoURL = user.photoURL;
	    // var isAnonymous = user.isAnonymous;
	    // var uid = user.uid;
	    // var providerData = user.providerData;

			firebase.auth().signOut().then(function() {
				res.status(200);
				res.send('User Logout Successfully')
			}).catch(function(error) {
		    var errorCode = error.code;
		    var errorMessage = error.message;
		    console.log(errorMessage)
				res.status(500)
				res.send(errorMessage)
			});
	  } else {
			res.status(500);
			res.send('There Is No User Signed In.')
	  }
	});
});

app.get('/signup', (req, res) => {
	console.log('signup')
	var email = 'yiucheung.ho@gmail.com';
	var password = 'Dream12345';

	User.signup(email, password).then(function(success) {
		if (success) {
			console.log('User create successfully')
		} else {
			console.error('Unable to create user.')
		}
		// console.log(user);
		// User.writeUserData(user.uid, user.displayName, user.email);
		res.status(200);
		// res.send('User Account Created')
	}).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
		console.log(error)
    console.log(errorMessage);
		res.status(500);
		res.send(errorMessage);
	});
});

app.get('/processCSV/:filename', function (req, res, next) {
	var inputPath = path.resolve(__dirname,'input');
	var outputPath = path.resolve(__dirname,'output');
	var filename = req.params.filename;
	console.log('CSV processing request received. File path: '+inputPath+'/'+filename)
	var job_filename = path.basename(filename).split(".")[0];

	var csvFilePath = inputPath + job_filename
	var jsonObj = [];
	var header = [];

	csv()
	.fromFile(csvFilePath)
	.on('json',(row)=>{
		console.log(row)
		jsonObj.push(row);
	})
	.on('done',(error)=>{
		console.log(outputPath+'/'+job_filename+'.json')
		fs.writeFile(outputPath+'/'+job_filename+'.json', JSON.stringify(jsonObj), function(err){
      if(err) {
        console.log(err)
      }
      console.log("The file was saved.");
    });
	})
	next()
}, function (req, res) {
  res.send('Request Processed.')
})

app.listen(port);

console.log(port)
console.log('server started');
