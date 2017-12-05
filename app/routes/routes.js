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

router.get("*", function(req, res) {
    res.redirect("/");
});

// // non-auth related routes
// app.get("/about", authController.about);
// app.get("*", authController.default);

// // not auth routes
// exports.about = function(req, res) {
// res.sendFile(path.join(__dirname, "/../public/about.html"));
// };
// exports.default = function(req, res) {
// res.redirect("/");
// };

module.exports = router;