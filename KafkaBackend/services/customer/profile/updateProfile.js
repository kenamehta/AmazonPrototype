"use strict";
const bcrypt = require("bcrypt");

const customer = require("../../../models/customer.model");

let updateProfile = async (msg, callback) => {
    try{
  const oldcustomer = await customer.findOne({
    emailId: msg.email,
  });
  console.log(oldcustomer)
  const filter = { emailId: msg.email };
  const update = { name: msg.name?msg.name:oldcustomer.name,
    city:msg.city?msg.city:oldcustomer.city,
    state:msg.state?msg.state:oldcustomer.state
    
 };
  let response = {};
  let err = {};
  const updatedCustomer = await customer.findOneAndUpdate(filter, update, {
    new: true,
    useFindAndModify: true,
  });

  console.log(updatedCustomer);
  (response.data = updatedCustomer), (response.status = 200);
  return callback(null, response);
}
catch(error){
    console.log(error)
    err.status = 500;
    err.data = {
      errors: {
        body: error
      },
    };
    return callback(err, null);
}
};

exports.updateProfile = updateProfile;
