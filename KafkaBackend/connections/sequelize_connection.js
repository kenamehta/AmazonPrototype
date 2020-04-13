const { Sequelize, DataTypes } = require("sequelize");
const credentials = require("./../config");
console.log(credentials);
const seq_connection = new Sequelize("amazon", "admin", credentials.password, {
  host: credentials.host,
  dialect: "mysql"
});

var test = seq_connection
  .authenticate()
  .then(function() {
    console.log("CONNECTED! ");
  })
  .catch(function(err) {
    console.log(err);
  })
  .done();
// const mysql = require("mysql");

// create the connection to database
// var connection = mysql.createPool({
//   connectionLimit: 10,
//   host: "mehtak.cimijgbx7bue.us-east-2.rds.amazonaws.com",
//   port: "3306",
//   user: "admin",
//   password: "admin#123",
//   database: "MEHTAK",
//   dateStrings: true
// });

// connection.query("SET FOREIGN_KEY_CHECKS=0", (err, res) => {
//   if (err) console.log("DB connection failed!!!");
//   else {
//     console.log("DB connection successful!!!");
//   }
// });
module.exports = seq_connection;
