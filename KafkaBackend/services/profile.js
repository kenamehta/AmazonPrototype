const seller = require('../models/seller.model');
const customer = require('../models/customer.model');

function handle_request(msg, callback) {
  var res = {};
  if(msg.path === 'seller_get'){
    seller.findOne({emailId:msg.emailId}, (err, user) => {
      if(err){
        res.status = 500;
        res.message = 'Database Error';
      } 
      if(user){
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
  } else if(msg.path === 'seller_update_profile'){
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
  } else if(msg.path === 'seller_update_profilePicture'){
    seller.findOne({emailId:msg.emailId}, (err, user) => {
      if(err){
        res.status = 500;
        res.message = 'Database Error';
        callback(null, res);
      } 
      if(user){
        user.profilePictureUrl = msg.fileUrl;
        user.save((saveError) => {
          if(saveError){
            res.status = 500;
            res.message = 'Error in Data';
          } else {
            let userObject = {
              profilePictureUrl: user.profilePictureUrl
            };
            res.status = 200;
            res.message = userObject;
          }
          callback(null, res);
        });
      }
    });
  }
}

exports.handle_request = handle_request;