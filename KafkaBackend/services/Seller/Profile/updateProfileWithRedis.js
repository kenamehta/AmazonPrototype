"use strict";
const seller = require('../../../models/seller.model');
const product = require('../../../models/product.model');
//const redisClient = require("../../../redisConfig");

const updateProfileWithRedis = (msg, callback) => {
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
      // Since cache holds product model which contains seller name field
      // so if one seller name gets updated clearing entire cache

      // if(user.name !== msg.name){
      //   console.log('Seller Name changed so flushing cache');
      //   redisClient.flushall();
      // }
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
          product.update({sellerEmailId:msg.emailId},{$set:{sellerName:msg.name}},{multi:true},(err,results)=>{
            if(err){
              res.status = 500;
              res.message = 'Database Error';
            } else {
              console.log('Results of product.update');
              console.log(results);
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
              // Need to send user paginated products too in result
              // or make a get call after receiving 200 from updateProfile.
              // since making update, doesn't change name in products immediately
              res.message = userObject;

              console.log('Flushing entire Redis');
              redisClient.flushall();
              console.log('Flushed Redis');
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

exports.updateProfileWithRedis = updateProfileWithRedis;