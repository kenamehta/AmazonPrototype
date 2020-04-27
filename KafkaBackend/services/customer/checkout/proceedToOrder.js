"use strict";
const customer = require("../../../models/customer.model");
const { Order, OrderProduct } = require("../../../models/order");
const product = require("../../../models/product.model");
const uuid = require("uuid/v4");

let proceedToOrder = async (msg, callback) => {
  console.log(msg);
  var totalPrice = 0,
    totalQuantity = 0;
  customer
    .findOne({
      _id: msg.params.id
    })
    .then(async result => {
      console.log(result);
      if (result) {
        const cartProducts = result.cartProducts;

        cartProducts.map(product => {
          totalQuantity += product.quantity;
          totalPrice += product.totalProductPrice;
          console.log(typeof product.quantity);
        });
        console.log(totalQuantity);
        let validity =
          msg.payment.expirationDate.substring(5, 7) +
          "/" +
          msg.payment.expirationDate.substring(2, 4);
        const addOrder = await Order.create({
          order_id: uuid(),
          CustomerEmailID: result.emailId,
          Address_details: msg.Address_details,
          cardNumber: msg.payment.cardNumber,
          cardName: msg.payment.cardName,
          cvv: msg.payment.cvv,
          validThru: validity,
          cancelOrder: 0,
          totalOrderQuantity: totalQuantity,
          totalOrderPrice: totalPrice
        }).then(result1 => {
          if (result) {
            let addOrder = null;
            Promise.all(
              cartProducts.map(async product => {
                addOrder = await OrderProduct.create({
                  _id: uuid(),
                  Product_id: product.productId,
                  quantity: product.quantity,
                  TotalPrice: product.totalProductPrice,
                  seller_email_id: product.sellerEmailId,
                  customer_email_id: result.emailId,
                  giftFlag: product.giftFlag === "false" ? 0 : 1,
                  giftmsg: product.giftMessage,
                  order_id: result1.order_id,
                  Status: 1
                });
              })
            ).then(() => {
              if (addOrder) {
                result.cartProducts = [];
                result.save();
                return callback(null, {
                  status: 200,
                  res: "Successfully added data"
                });
              }
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
      console.log(err);
      return callback({ status: 500, res: err }, null);
    });
};

exports.proceedToOrder = proceedToOrder;
