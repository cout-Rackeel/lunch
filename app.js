const port = process.env.PORT || 8080;

// BASE VARIABLES

var express = require("express");
var flash = require("express-flash");
var expresslayout = require("express-ejs-layouts");
var session = require("express-session");
var validator = require("express-validator");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var app = express()

//ROUTES
var indexRoute = require('./routes/index');
var lunchRoute = require('./routes/lunch');
var traineesRoute = require('./routes/trainees');

// SETTING LAYOUT
app.set("layout", "layouts/layout");
app.use(expresslayout);

// SETTING VIEW
app.set('view', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// SETTING BODYPARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended : true }))

// SETUP SESSION
app.use(cookieParser());
app.use(session({
  secret:'@I0N3',
  saveUninitialized:true,
  resave:'false',
  cookie: {maxAge: 120000}
}));
app.use(flash());
// END SESSION SETUP


//USING ROUTES MIDDLEWARE
app.use('/', indexRoute);
app.use('/lunch', lunchRoute);
app.use('/trainees', traineesRoute);


app.listen(port, () => console.log(`Listening on port ${port}...`));
module.exports = app
