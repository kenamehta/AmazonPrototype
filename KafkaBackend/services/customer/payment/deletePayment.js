"use strict";
const customer = require("../../../models/customer.model");

let deletePayment = async (msg, callback) => {
  console.log(msg);
  customer
    .findOne({
      _id: msg.params.id,
      "paymentCards._id": msg.card_id
    })
    .then(async result => {
      console.log(result);
      if (result) {
        let idx = -1;
        for (let i = 0; i < result.paymentCards.length; i++) {
          if (result.paymentCards[i]._id == msg.card_id) {
            idx = i;
            break;
          }
        }
        if (idx !== -1) {
          result.paymentCards.splice(idx, 1);
          result
            .save()
            .then(() => {
              return callback(null, {
                status: 200,
                paymentCards: result.paymentCards
              });
            })
            .catch(err => {
              console.log(err);
              return callback(
                {
                  status: 500,
                  res: err
                },
                null
              );
            });
        } else {
          return callback(
            {
              status: 403,
              res: "Selected PaymentCard not found"
            },
            null
          );
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
    });
};

exports.deletePayment = deletePayment;
