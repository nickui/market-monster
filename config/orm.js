// import connection
var connection = require("./connection.js");

var orm = {
    // select all table contents
    all: function(table, callback) {
        var query = "SELECT * FROM ??";
        connection.query(query, table, function(err, result) {
            if (err) throw err;
            callback(result);
        });
    },

    // updates table contents
    update: function(table, condition, callback) {
        // var query = "UPDATE ?? SET devoured=true WHERE id ?";
        // connection.query(query, [table, condition], function(err, result) {
        connection.query("UPDATE " + table + " SET devoured=true WHERE id=" + condition + ";", function(err, result) {
            if (err) throw err;
            callback(result);    
        });
    },

    create: function(table, val, callback) {
        connection.query("INSERT INTO " + table + " (burger_name) VALUES ('" + val + "');", function(err, result) {
            if(err) throw err;
            callback(result);
        });
    }
};



// orm.create

// orm.update

// var orm = {
//     selectWhere: function(table, col, val, cb) {
//         return new Promise(function (res, rej) {
//             var queryString = "SELECT * FROM ?? WHERE ?? = ??";
//             connection.query(queryString, [tableInput, colToSearch, valOfCol], function(err, result) {
//                 if (err) rej(err);
//                 res(result);
//             });
//         })
//     }
// };

module.exports = orm;
