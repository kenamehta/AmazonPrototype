"use strict";
const customer = require("../../../models/customer.model");

let deleteAddress = async (msg, callback) => {
  console.log(msg);
  customer
    .findOne({
      _id: msg.params.id,
      "addresses._id": msg.address_id
    })
    .then(async result => {
      console.log(result);
      if (result) {
        let idx = -1;
        for (let i = 0; i < result.addresses.length; i++) {
          if (result.addresses[i]._id == msg.address_id) {
            idx = i;
            break;
          }
        }
        if (idx !== -1) {
          result.addresses.splice(idx, 1);
          result
            .save()
            .then(() => {
              return callback(null, {
                status: 200,
                addresses: result.addresses
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
              res: "Selected Address not found"
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

exports.deleteAddress = deleteAddress;
