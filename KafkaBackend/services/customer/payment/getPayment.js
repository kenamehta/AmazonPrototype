"use strict";
const customer = require("../../../models/customer.model");

let getPayment = async (msg, callback) => {
  console.log(msg);
  customer
    .findOne({
      _id: msg.params.id
    })
    .then(async result => {
      console.log(result);
      if (result) {
        return callback(null, {
          status: 200,
          paymentCards: result.paymentCards
        });
      } else {
        return callback(
          {
            status: 403,
            res: "Customer not found"
          },
          null
        );
      }
    })
    .catch(err => {
      return callback({ status: 500, res: err }, null);
    });
};

exports.getPayment = getPayment;
