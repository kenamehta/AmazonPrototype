// const seller = require("../models/seller.model");
// const customer = require("../models/customer.model");
const { customerRegister, sellerRegister } = require("../models/registration");

function handle_request(msg, callback) {
  const { user_id, userRole } = msg;
  let model = "";
  model =
    jwt_payload.category === "customer"
      ? customerRegister
      : jwt_payload.category === "seller" ? sellerRegister : "";
  if (model) {
    model.findOne({ where: { _id: user_id } }, (err, results) => {
      if (err) {
        return callback(null, false);
      }
      if (results) {
        callback(null, results);
      } else {
        callback(null, false);
      }
    });
  } else {
    return callback(null, { user: "admin" });
  }
}

exports.handle_request = handle_request;
