// const seller = require("../models/seller.model");
// const customer = require("../models/customer.model");
const { customerRegister, sellerRegister } = require("../models/registration");

function handle_request(msg, callback) {
  console.log('Inside handle_request of passport service kafka backend');
  console.log(msg);
  const { user_id, userRole } = msg;
  let model = "";
  model =
    userRole === "customer"
      ? customerRegister
      : userRole === "seller"
      ? sellerRegister
      : "";
  console.log('Selected model is');
  console.log(model);
  if (model) {
    console.log('Executing query now');
    model.findOne({ where: { _id: user_id } })
    .then(result => {
      if(result){
        console.log('User found: '+result);
        callback(null, result);
      } else {
        console.log('User Not found');
        callback(null, false);
      }
    }).catch(err => {
      console.log("Error caught: "+err);
      return callback(null, false);
    });
  } else {
    return callback(null, { user: "admin" });
  }
}

exports.handle_request = handle_request;
