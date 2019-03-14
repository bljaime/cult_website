var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'bljaime',
    database: 'join_us'
});
 
app.get("/", function(request, response){  // ROOT DIRECTORY
 var q = 'SELECT COUNT(*) as count FROM users';  // Find count of users in DB
 connection.query(q, function (error, results) {
 if (error) throw error;
 var count = results[0].count
 response.render("home", {data: count});  // Response using home file (Embedded JS)
 });
});

app.post('/register', function(request,response){  // REGISTER DIRECTORY
 var person = {email: request.body.email};
 connection.query('INSERT INTO users SET ?', person, function(err, result) {
 if (err) throw err;
 response.redirect("/");  // Once inserted the email, redirect to root directory
 });
});

app.get("/joke", function(request, response){  // Directories no one has to see
 var joke = "What do you call a dog that does magic tricks? A labracadabrador.";
 response.send(joke);
});

app.get("/random_num", function(request, response){  // Directories no one has to see
 var num = Math.floor((Math.random() * 10) + 1);
 response.send("Your lucky number is " + num);
});
 
app.listen(8080, function () {
 console.log('App listening on port 8080!');
});