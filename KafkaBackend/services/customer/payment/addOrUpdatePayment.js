"use strict";
const customer = require("../../../models/customer.model");

let addOrUpdatePayment = async (msg, callback) => {
  console.log(msg);
  customer
    .findOne({
      _id: msg.params.id,
      "paymentCards._id": msg.card_id
    })
    .then(async result => {
      console.log(result + "res found");
      if (result) {
        let idx = -1;
        for (let i = 0; i < result.paymentCards.length; i++) {
          if (result.paymentCards[i]._id == msg.card_id) {
            idx = i;
            break;
          }
        }
        if (idx !== -1) {
          const newPayment = {
            cardName: msg.cardName || result.paymentCards[idx].cardName,
            cardNumber: msg.cardNumber || result.paymentCards[idx].cardNumber,
            expirationDate:
              msg.expirationDate || result.paymentCards[idx].expirationDate,
            cvv: msg.cvv || result.paymentCards[idx].cvv
          };
          result.paymentCards[idx].cardName = newPayment.cardName;
          result.paymentCards[idx].cardNumber = newPayment.cardNumber;
          result.paymentCards[idx].expirationDate = newPayment.expirationDate;
          result.paymentCards[idx].cvv = newPayment.cvv;
          // result.paymentCards[idx] = newPayment;
          console.log(result.paymentCards);
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
                  status: 403,
                  res: "Error while updating Payment sub-document"
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
        console.log("in else");
        customer
          .findOne({ _id: msg.params.id })
          .then(result => {
            const newPayment = {
              cardName: msg.cardName,
              cardNumber: msg.cardNumber,
              expirationDate: msg.expirationDate,
              cvv: msg.cvv
            };
            result.paymentCards.push(newPayment);
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
                    status: 403,
                    res: err
                  },
                  null
                );
              });
          })
          .catch(err => {
            console.log(err);
            return callback(
              {
                status: 403,
                res: err
              },
              null
            );
          });
      }
    });
};

exports.addOrUpdatePayment = addOrUpdatePayment;
