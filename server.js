// https://code.tutsplus.com/tutorials/using-passport-with-sequelize-and-mysql--cms-27537
// assigns express module to express
var express = require('express');
// initialize express
var app = express();
// import needed modules for authentication
var passport   = require('passport');
var session    = require('express-session');
// to extract body part of incoming request to JSON
var bodyParser = require('body-parser');
// environment variables
var env = require("dotenv").load();

// Middleware
// to allow app to use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// initialize passport and express session 
app.use(session( { 
    secret: 'keyboard cat',
    resave: true, 
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// app.get('/', function(req, res) {
//     res.send('Welcome to Passport with Sequelize');
// });

//Models
var models = require("./app/models");

//Routes
var routes = require("./app/routes/routes.js");
var authRoute = require('./app/routes/auth.js')(app, passport);
var apiRoutes = require("./app/routes/apiRoutes.js")(app);

// initialize routes
app.use("/", routes);

// Static directory
app.use(express.static("./app/public"));

//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function() {
    console.log('Database syncing')
}).catch(function(err) {
    console.log(err, "Database not syncing")
});

// start server
var port = 3000;
app.listen(port, function(err) {
    if (!err) {
        console.log("Listening on port", port);
    } else {
        console.log(err);
    }
});