"use strict";
const product = require("../../../models/product.model");
const comment = require("../../../models/comment.model");
const customer = require("../../../models/customer.model");

// const redisClient = require("../../../redisConfig");

// sends all fields of a product document from mongoDb in response.
const getProduct = (msg, callback) => {
  var res = {};
  console.log('Not present in Redis');
  // msg.productId is _id of product
  // product.findOne({_id:msg.productId, validFlag:"true"}, (err, product) => {
  // for getting Product not checking validFlag true, since if customer orders product,
  // the product is in order and customer can go to order and visit product page.
  // for showing all products in database, we will use another api that will have validFlag true and thus
  // would not show deleted products in search.
  product.findById(msg.productId, (err, foundProduct) => {
    if(err){
      res.status = 500;
      res.message = 'Database Error';
      callback(null, res);
    }
    if(foundProduct){
      const date = new Date();
      // getting date in mm/dd/yyyy format
      const myCustomDate = (date.getMonth() + 1) + "/" + (date.getDate()) + "/" + (date.getFullYear());

      // checking if myCustomDate already exists in clickCount array
      let index = -1;
      for(let i in foundProduct.clickCount){
        if(foundProduct.clickCount[i].date === myCustomDate){
          index = i;
          break;
        }
      }

      if ( index === -1 ) {
        foundProduct.clickCount.push({date: myCustomDate, count: 1});
      } else {
        foundProduct.clickCount[index].count = foundProduct.clickCount[index].count + 1;
      }

      // getting all comments for the product.
      comment.find({productId:msg.productId},async(err,allComments) => {
        if(err){
          res.status = 500;
          res.message = 'Database Error';
          callback(null, res);
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
            callback(null, res);
          }
        }
        // console.log(allCommentsWithUserDetails);
        // updating clickCount in database
        foundProduct.save((saveError, savedProduct) => {
          if(saveError){
            res.status = 500;
            res.message = 'Database Error';
          } else {

            // redisClient.setex(savedProduct.id, 36000, JSON.stringify(savedProduct));

            console.log('Saved Below Product in Redis');
            console.log(savedProduct);

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
          }
          callback(null, res);
        });
      });
    } else {
      res.status = 400;
      res.message = "Not found";
      callback(null, res);
    }
  }); 
};

exports.getProduct = getProduct;