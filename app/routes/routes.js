// routes that do not require authorization
// set up express 
var express = require("express");
var path = require("path");

var router = express.Router();

//var burger = require("../models/burger.js");

// base route
router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/home.html"));
});

router.get("/about", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/about.html"));
});


// CSS routes
router.get("/style", function(req, res) {
    res.sendFile(path.join(__dirname, '/../public/assets/css/style.css'));
});

router.get("/logincss", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/assets/css/login.signup.css"));
});

router.get("/dashboardcss", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/assets/css/dashboard.css"));
});

// JS routes
router.get("/appjs", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/assets/js/app.js"));
});

router.get("/singupjs", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/assets/js/signup.js"));
});


module.exports = router;