"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./config");
const { customerRegister, sellerRegister } = require("../models/registration");

// Setup work and export for the JWT passport strategy
function auth() {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: secret
  };
  passport.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
      let model = "";
      model =
        jwt_payload.category === "customer"
          ? customerRegister
          : jwt_payload.category === "seller" ? sellerRegister : "";
      const user_id = jwt_payload._id;
      if (model) {
        model
          .findOne({ where: { _id: user_id } })
          .then(result => {
            if (result) callback(null, result);
            else return callback(null, false);
          })
          .catch(err => {
            return callback(err, false);
          });
      } else {
        callback(null, { user: "admin" });
      }
    })
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });
