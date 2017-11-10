var mongoose = require('mongoose');

var Stock = mongoose.Schema({
	code: String
});

module.exports = mongoose.model("Stock", Stock);