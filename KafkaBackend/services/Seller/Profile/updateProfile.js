"use strict";
const seller = require('../../../models/seller.model');
const product = require('../../../models/product.model');

const updateProfile = (msg, callback) => {
  console.log('Inside updateProfile of Seller in Kafka');
  console.log(msg);
  var res = {};
  seller.findById(msg.id, (err, user) => {
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
          res.message = 'Database Error';
          callback(null, res);
        } else {
          product.update({sellerEmailId:msg.sellerEmailId},{$set:{sellerName:msg.name}},{multi:true},(err,results)=>{
            if(err){
              res.status = 500;
              res.message = 'Database Error';
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
    } else{
      res.status = 400;
      res.message = "User Not found";
      callback(null,res);
    }
  });
};

exports.updateProfile = updateProfile;