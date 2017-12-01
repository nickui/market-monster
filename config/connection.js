// MySQL connection data
var mysql = require("mysql");

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    var connection = mysql.createConnection({
        port: 3306,
        host: "localhost",
        user: "root",
        password: "test",
        database: "burgers_db"
    });
}
// connect
connection.connect(function(err) {
    if (err) throw err;
    console.log("You have connected to: " + connection.threadId);
});

// export connection
module.exports = connection;