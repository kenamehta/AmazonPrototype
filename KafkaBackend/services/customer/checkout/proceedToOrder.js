"use strict";
const customer = require("../../../models/customer.model");
const { Order, OrderProduct } = require("../../../models/order");
const product = require("../../../models/product.model");
const uuid = require("uuid/v4");

let proceedToOrder = async (msg, callback) => {
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
          cardNumber: msg.payment.cardNumber,
          cardName: msg.payment.cardName,
          cvv: msg.payment.cvv,
          validThru: msg.payment.expirationDate,
          cancelOrder: 0
        }).then(result1 => {
          if (result) {
            const cartProducts = result.cartProducts;
            cartProducts.map(async product => {
              const addOrder = await OrderProduct.create({
                _id: uuid(),
                Product_id: product.productId,
                quantity: product.quantity,
                TotalPrice: product.totalProductPrice,
                seller_email_id: product.sellerEmailId,
                customer_email_id: result.emailId,
                giftFlag: product.giftFlag === "false" ? 0 : 1,
                giftmsg: product.giftMessage,
                order_id: result1.order_id,
                Status: "Order placed"
              });
            });
            return callback(null, {
              status: 200,
              res: "Successfully added data"
            });
          }
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

exports.proceedToOrder = proceedToOrder;
