"use strict";
const product = require("../../../models/product.model");
const comment = require("../../../models/comment.model");

const addComment = (msg, callback) => {
  var res = {};

  // msg.productId is _id of product
  product.findOne({_id:msg.productId, validFlag:"true"}, (err, foundProduct) => {
    if(err){
      res.status = 500;
      res.message = 'Database Error';
      callback(null, res);
    }
    if(foundProduct){
      // msg.customerId is _id of customer
      let commentToCreate = comment({
        customerId: msg.customerId,
        productId: msg.productId,
        comment: msg.comment,
        rating: parseInt(msg.rating)
      });

      commentToCreate.save((commentSaveError) => {
        if(commentSaveError){
          res.status = 500;
          res.message = 'Database Error';
          callback(null, res);
        } else {
          console.log('Comment Successfully Created');

          // updating product averageRating
          const numberOfComments = comment.find({productId: msg.productId}).count();
          console.log('Total number of comments for product: '+productId+' is: '+numberOfComments);
          const newRating = ((foundProduct.averageRating * (numberOfComments - 1)) + parseInt(msg.rating)) / numberOfComments ;
          console.log('Product new Average Rating: '+newRating);
          foundProduct.averageRating = newRating;

          foundProduct.save((productSaveError) => {
            if(productSaveError){
              res.status = 500;
              res.message = 'Database Error';
              callback(null, res);
            } else {
              res.status = 200;
              res.message = foundProduct
              callback(null, res);
            }
          });
        }
      });
    } else {
      res.status = 400;
      res.message = "Not found";
      callback(null, res);
    }
  });
};

exports.addComment = addComment;