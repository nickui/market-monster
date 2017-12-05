var exports = module.exports = {}

var path = require("path");

exports.signup = function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/signup.html"));
};

exports.signin = function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/login.html"));
};

exports.dashboard = function(req, res) {
    //console.log(path.join(__dirname, "/../views/dashboard.html"));
    res.sendFile(path.join(__dirname, "/../public/dashboard.html"));
};

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
};

