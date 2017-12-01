// set up express 
var express = require("express");
var burger = require("../models/burger.js");

var router = express.Router();

//var burger = require("../models/burger.js");

// base route
router.get("/", function(req, res) {
    burger.all(function(burgerData) {
        console.log(burgerData);
        res.render("index", {burgerData});
    });
});

// to update burgers after devouring
router.put("/burgers/update", function(req, res) {
    burger.update(req.body.burger_id, function(result) {
        console.log(result);
        res.redirect("/");
    });
});

// add using submit button
router.post("/burgers/create", function(req, res) {
    burger.create(req.body.burger_name, function(result) {
        res.redirect("/");
    });
});

module.exports = router;