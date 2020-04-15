"use strict";
const seller = require('../../../models/seller.model');

const updateProfile = (msg, callback) => {
  console.log('Inside updateProfile of Seller');
  var res = {};
  seller.findOne({emailId:msg.emailId}, (err, user) => {
    if(err){
      res.status = 500;
      res.message = 'Database Error';
      callback(null, res);
    } 
    if(user){
      user.name = msg.name;
      user.phone = msg.phone;
      user.street = msg.street;
      user.city = msg.city;
      user.state = msg.state;
      user.country = msg.country;
      user.zipcode = msg.zipcode;
      user.save((saveError) => {
        if(saveError){
          res.status = 500;
          res.message = 'Error in Data';
        } else {
          let userObject = {
            userId: user._id,
            emailId: user.emailId,
            name: user.name,
            phone: user.phone,
            profilePictureUrl: user.profilePictureUrl,
            street: user.street,
            city: user.city,
            state: user.state,
            country: user.country,
            zipcode: user.zipcode
          };
          res.status = 200;
          res.message = userObject;
        }
        callback(null, res);
      });
    }
  });
};

exports.updateProfile = updateProfile;