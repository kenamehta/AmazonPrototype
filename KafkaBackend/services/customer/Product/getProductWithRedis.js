"use strict";
const mongoose = require('mongoose');
const product = require("../../../models/product.model");
const comment = require("../../../models/comment.model");
const customer = require("../../../models/customer.model");
const Click = require("../../../models/clickCount.model");

//const redisClient = require("../../../redisConfig");

// sends all fields of a product document from mongoDb in response.
const getProductWithRedis = (msg, callback) => {
  var res = {};
  try{
    redisClient.get(msg.productId, async(err, foundProduct) => {
      const date = new Date();
      // getting date in mm/dd/yyyy format
      const myCustomDate = ((date.getMonth() + 1)<10?'0'+(date.getMonth() + 1):(date.getMonth() + 1)) + "/" + (date.getDate()<10?'0'+date.getDate():date.getDate()) + "/" + (date.getFullYear());
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
      } 
      if(foundProduct){
        console.log('Found in Redis');
        res.status = 200;
        res.message = JSON.parse(foundProduct);

        if(!foundProductWithPreviousClick) {
          console.log('Not previously in clickCount DB');
          let clickDocumentToCreate = Click({
            productId: mongoose.Types.ObjectId(msg.productId),
            productName: res.message.productName,
            lastViewedCustomDate: myCustomDate,
            count: 1
          });
          let clickDocumentToCreateResponse = await clickDocumentToCreate.save();
        }
        return callback(null, res);
      } else {
        console.log('Not Found in Redis');
        let resultProduct = await product.findById(msg.productId);
        if(!resultProduct){
          res.status = 400;
          res.message = "Not found";
          return callback(null, res);
        } else {
          console.log('Not previously in clickCount DB');
          let clickDocumentToCreate = Click({
            productId: mongoose.Types.ObjectId(msg.productId),
            productName: resultProduct.productName,
            lastViewedCustomDate: myCustomDate,
            count: 1
          });
          let clickDocumentToCreateResponse = await clickDocumentToCreate.save();

          let allComments = await comment.find({productId:msg.productId});
          let allCommentsWithUserDetails = []
          if(allComments) {
            for(const eachComment of allComments){
              const result = await customer.findById(eachComment.customerId);
              if(result) {
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
              }
            }
          }
          const obj = {
            validFlag:resultProduct.validFlag,
            averageRating:resultProduct.averageRating,
            photos:resultProduct.photos,
            _id:resultProduct._id,
            sellerId:resultProduct.sellerId,
            sellerEmailId:resultProduct.sellerEmailId,
            sellerName:resultProduct.sellerName,
            productName:resultProduct.productName,
            productCategory:resultProduct.productCategory,
            productPrice:resultProduct.productPrice,
            productDescription:resultProduct.productDescription,
            clickCount:resultProduct.clickCount,
            comments: allCommentsWithUserDetails
          }
          res.status = 200;
          res.message = obj;
          console.log('Saving in Redis');
          redisClient.setex(msg.productId, 36000, JSON.stringify(obj));
          console.log('Saved in Redis');
          return callback(null, res);
        }
      }
    });
  } catch(error){
    console.log('Database Error');
    res.status = 500;
    res.message = 'Database Error';
    return callback(null, res);
  }
};

exports.getProductWithRedis = getProductWithRedis;