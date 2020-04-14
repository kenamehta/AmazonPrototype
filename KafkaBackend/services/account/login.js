"use strict";
const bcrypt = require("bcrypt");
const {
  customerRegister,
  sellerRegister
} = require("../../models/registration");
// const jwt = require("jsonwebtoken");
// const { secret } = require("../../utils/config");
// const { auth } = require("../../utils/passport");
// auth();

let login = async (msg, callback) => {
  let model = "";
  console.log(JSON.stringify(msg));
  model =
    msg.category === "customer"
      ? customerRegister
      : msg.category === "seller" ? sellerRegister : "admin";
  let email = msg.email;
  if (model != "admin") {
    model
      .findOne({ where: { emailId: email } })
      .then(result => {
        if (result) {
          bcrypt.compare(msg.password, result.password, async function(
            err,
            matchFlag
          ) {
            if (err) {
              console.log("Error caught in password comparison");
              return callback(
                { status: 403, res: "Error caught in password comparison" },
                null
              );
            } else if (!matchFlag) {
              console.log("Password Incorrect");

              return callback({ status: 403, res: "Password Incorrect" }, null);
            } else {
              console.log("Logged in successfully");
              // const logintoken = await generateToken(result._id);
              // const token = jwt.sign(
              //   { _id: result._id, category: msg.category },
              //   secret,
              //   {
              //     expiresIn: 1008000
              //   }
              // );
              // var jwtToken = "JWT " + token;
              return callback(null, {
                status: 200,
                id: result._id,
                res: "Logged in successfully"
                // ,
                // idToken: jwtToken
              });
            }
          });
        } else {
          console.log("User not found");
          return callback({ status: 403, res: "User not found" }, null);
        }
      })
      .catch(err => {
        console.log("Error caught");
        return callback({ status: 500, res: "Error caught" }, null);
      });
  } else {
    if (msg.email == "admin" && msg.password == "admin")
      return callback(null, { status: 200, res: "Logged In Successfully" });
    else
      return callback({ status: 403, res: "Admin Password Incorrect" }, null);
  }
};

exports.login = login;
