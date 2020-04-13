const mysql = require("mysql2");
const { host, password } = require("./../config");

// create the connection to database
var mysql_connection = mysql.createPool({
  connectionLimit: 10,
  host: host,
  port: "3306",
  user: "admin",
  password: password,
  database: "MEHTAK",
  dateStrings: true
});

mysql_connection.query("SET FOREIGN_KEY_CHECKS=0", (err, res) => {
  if (err) console.log("DB connection failed!!!");
  else {
    console.log("DB connection successful!!!");
  }
});
module.exports = mysql_connection;
