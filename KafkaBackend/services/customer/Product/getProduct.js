"use strict";
const mongoose = require('mongoose');
const product = require("../../../models/product.model");
const comment = require("../../../models/comment.model");
const customer = require("../../../models/customer.model");
const Click = require("../../../models/clickCount.model");


// const redisClient = require("../../../redisConfig");

// sends all fields of a product document from mongoDb in response.
const getProduct = (msg, callback) => {
  var res = {};
  
  // msg.productId is _id of product
  // product.findOne({_id:msg.productId, validFlag:"true"}, (err, product) => {
  // for getting Product not checking validFlag true, since if customer orders product,
  // the product is in order and customer can go to order and visit product page.
  // for showing all products in database, we will use another api that will have validFlag true and thus
  // would not show deleted products in search.
  product.findById(msg.productId, async(err, foundProduct) => {
    if(err){
      res.status = 500;
      res.message = 'Database Error';
      return callback(null, res);
    }
    if(foundProduct){
      const date = new Date();
      // getting date in mm/dd/yyyy format
      const myCustomDate = ((date.getMonth() + 1)<10?'0'+(date.getMonth() + 1):(date.getMonth() + 1)) + "/" + (date.getDate()<10?'0'+date.getDate():date.getDate()) + "/" + (date.getFullYear());
      try {
        let foundProductWithPreviousClick = await Click.findOne({productId:msg.productId});
        if(foundProductWithPreviousClick)
        {
          console.log('Previously in clickCount DB');
          if(foundProductWithPreviousClick.lastViewedCustomDate === myCustomDate){
            foundProductWithPreviousClick.count = foundProductWithPreviousClick.count + 1;
          } else {
            foundProductWithPreviousClick.lastViewedCustomDate = myCustomDate;
            foundProductWithPreviousClick.count = 1;
          }
          let foundProductWithPreviousClickSaveResponse = await foundProductWithPreviousClick.save();
        } else {
          console.log('Not previously in clickCount DB');
          let clickDocumentToCreate = Click({
            productId: mongoose.Types.ObjectId(msg.productId),
            productName: foundProduct.productName,
            lastViewedCustomDate: myCustomDate,
            count: 1
          });
          let clickDocumentToCreateResponse = await clickDocumentToCreate.save();
        }
        console.log('Preparing getProduct Response now');
        // getting all comments for the product.
        comment.find({productId:msg.productId},async(err,allComments) => {
          if(err){
            res.status = 500;
            res.message = 'Database Error';
            return callback(null, res);
          } 
          //console.log(allComments);
          let allCommentsWithUserDetails = []
          for(const eachComment of allComments){
            try{
              const result = await customer.findById(eachComment.customerId);
              allCommentsWithUserDetails.push({
                _id:eachComment._id,
                customerId:eachComment.customerId,
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
          
          // redisClient.setex(foundProduct.id, 36000, JSON.stringify(foundProduct));

          console.log('Saved Below Product in Redis');
          // console.log(foundProduct);

          res.status = 200;
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
          res.message = obj;
          return callback(null, res);
        });

      } catch(err){
        res.status = 500;
        res.message = 'Database Error';
        return callback(null, res);
      }
    } else {
      res.status = 400;
      res.message = "Not found";
      return callback(null, res);
    }
  }); 
};

exports.getProduct = getProduct;