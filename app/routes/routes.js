// routes that do not require authorization
// set up express 
var express = require("express");
var path = require("path");
var formidable = require('formidable');
var fs = require('fs');

var router = express.Router();

// base route
router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/home.html"));
});

router.get("/about", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/about.html"));
});

router.post('/upload', function(req, res){
    
    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/../uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
    res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

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