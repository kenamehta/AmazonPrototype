"use strict";
const customer = require("../../../models/customer.model");
const { Order, OrderProduct } = require("../../../models/order");
const product = require("../../../models/product.model");
const uuid = require("uuid/v4");

let getPayment = async (msg, callback) => {
  console.log(msg);
  customer
    .findOne({
      _id: msg.params.id
    })
    .then(async result => {
      console.log(result);
      if (result) {
        const addOrder = await Order.create({
          order_id: uuid(),
          CustomerEmailID: result.emailId,
          Address_details: msg.Address_details,
          cardNumber: msg.cardNumber,
          cardName: msg.cardName,
          cvv: msg.cvv,
          validThru: msg.expirationDate,
          cancelOrder: 0
        });
        if (addOrder) {
          const cartProducts = result.cartProducts;
          
        }
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
