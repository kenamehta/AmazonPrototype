"use strict";
const customer = require("../../../models/customer.model");

let addOrUpdateAddress = async (msg, callback) => {
  console.log(msg);
  customer
    .findOne({
      _id: msg.params.id,
      "addresses._id": msg.address_id
    })
    .then(async result => {
      console.log(result + "res found");
      if (result) {
        let idx = -1;
        for (let i = 0; i < result.addresses.length; i++) {
          if (result.addresses[i]._id == msg.address_id) {
            idx = i;
            break;
          }
        }
        if (idx !== -1) {
          const newAddress = {
            addressName: msg.addressName || result.addresses[idx].addressName,
            street: msg.street || result.addresses[idx].street,
            city: msg.city || result.addresses[idx].city,
            state: msg.state || result.addresses[idx].state,
            country: msg.country || result.addresses[idx].country,
            zipcode: msg.zipcode || result.addresses[idx].zipcode,
            phone: msg.phone || result.addresses[idx].phone
          };
          result.addresses[idx].addressName = newAddress.addressName;
          result.addresses[idx].street = newAddress.street;
          result.addresses[idx].city = newAddress.city;
          result.addresses[idx].state = newAddress.state;
          result.addresses[idx].country = newAddress.country;
          result.addresses[idx].zipcode = newAddress.zipcode;
          result.addresses[idx].phone = newAddress.phone;
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
                  status: 403,
                  res: "Error while updating Address sub-document"
                },
                null
              );
            });
        } else {
          return callback(
            {
              status: 403,
              res: "Selected AddressCard not found"
            },
            null
          );
        }
      } else {
        console.log("in else");
        customer
          .findOne({ _id: msg.params.id })
          .then(result => {
            const newAddress = {
              addressName: msg.addressName,
              street: msg.street,
              city: msg.city,
              state: msg.state,
              country: msg.country,
              zipcode: msg.zipcode,
              phone: msg.phone
            };
            result.addresses.push(newAddress);
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

exports.addOrUpdateAddress = addOrUpdateAddress;
