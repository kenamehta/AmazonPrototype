"use strict";
const product = require("../../../models/product.model");
const comment = require("../../../models/comment.model");
const customer = require("../../../models/customer.model");

//const redisClient = require("../../../redisConfig");
const mongoose = require("mongoose");

const addCommentWithRedis = (msg, callback) => {
  var res = {};

  // msg.productId is _id of product
  product.findOne({_id:msg.productId, validFlag:"true"}, (err, foundProduct) => {
    if(err){
      res.status = 500;
      res.message = 'Database Error';
      return callback(null, res);
    }
    if(foundProduct){
      // msg.customerId is _id of customer
      let commentToCreate = comment({
        customerId: msg.customerId,
        productId: mongoose.Types.ObjectId(msg.productId),
        title:msg.title,
        comment: msg.comment,
        rating: parseInt(msg.rating)
      });

      commentToCreate.save((commentSaveError) => {
        if(commentSaveError){
          res.status = 500;
          res.message = 'Database Error';
          return callback(null, res);
        } else {
          console.log('Comment Successfully Created');

          // updating product averageRating
          comment.find({productId: msg.productId}, (err, results) => {
            if(err){
              res.status = 500;
              res.message = 'Database Error';
              return callback(null, res);
            } else {
              const numberOfComments = results.length;
              console.log('Total number of comments for product: '+msg.productId+' is: '+numberOfComments);
              // rounding to nearest 0.5 by using formulae (Math.round(num*2)/2)
              const newRating = Math.round((((foundProduct.averageRating * (numberOfComments - 1)) + parseInt(msg.rating)) / numberOfComments)*2)/2 ;
              console.log('Product new Average Rating: '+newRating);

              foundProduct.averageRating = newRating;

              foundProduct.save(async(productSaveError) => {
                if(productSaveError){
                  res.status = 500;
                  res.message = 'Database Error';
                  return callback(null, res);
                } else {

                  //console.log(allComments);
                  let allCommentsWithUserDetails = []
                  for(const eachComment of results){
                    try{
                      const result = await customer.findById(msg.customerId);
                      allCommentsWithUserDetails.push({
                        _id:eachComment._id,
                        customerId:msg.customerId,
                        productId:eachComment.productId,
                        title:eachComment.title,
                        comment:eachComment.comment,
                        rating:eachComment.rating,
                        createdAt:eachComment.createdAt,
                        updatedAt:eachComment.updatedAt,
                        customerEmailId:result.emailId,
                        customerName:result.name,
                        customerProfilePictureUrl:result.profilePictureUrl,
                      });
                    } catch(error){
                      res.status = 500;
                      res.message = 'Database Error';
                      return callback(null, res);
                    }
                  }

                  console.log('All comments with user details');
                  console.log(allCommentsWithUserDetails);

                  const obj = {
                    validFlag:foundProduct.validFlag,
                    averageRating:foundProduct.averageRating,
                    photos:foundProduct.photos,
                    _id:foundProduct._id,
                    sellerId:foundProduct.sellerId,
                    sellerEmailId:foundProduct.sellerEmailId,
                    sellerName:foundProduct.sellerName,
                    productName:foundProduct.productName,
                    productCategory:foundProduct.productCategory,
                    productPrice:foundProduct.productPrice,
                    productDescription:foundProduct.productDescription,
                    clickCount:foundProduct.clickCount,
                    comments: allCommentsWithUserDetails
                  }

                  res.status = 200;
                  res.message = obj
                  console.log('Saving in Redis');
                  redisClient.setex(msg.productId, 36000, JSON.stringify(obj));
                  console.log('Saved in Redis');
                  return callback(null, res);
                }
              });
            }
          });
        }
      });
    } else {
      res.status = 400;
      res.message = "Not found";
      return callback(null, res);
    }
  });
};

exports.addCommentWithRedis = addCommentWithRedis;