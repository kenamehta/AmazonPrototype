"use strict";
const product = require("../../../models/product.model");
//const redisClient = require("../../../redisConfig");

// need to assume limit is fixed
const getMultipleProducts = (msg, callback) => {
  var res = {};
  console.log("Inside getMultipleProducts in kafka");
  console.log(msg);

  // if(msg.orderOn === '' && msg.order === '' && msg.sellerEmailId === '' && msg.sellerName === '' && msg.productName === '' && msg.productCategory === '' && msg.minPrice === '' && msg.maxPrice === '' && msg.minRating === '' && msg.maxRating === ''){
  //   console.log('Trying to fetch for customer from Redis');
  //   redisClient.get(msg.page, (err, redisResult) => {
  //     if(err){
  //       res.status = 500;
  //       res.message = 'Redis Error';
  //       callback(null, res);
  //     }
  //     if(redisResult){
  //       console.log('Found in redis');
  //       res.status = 200;
  //       res.message = JSON.parse(redisResult);
  //       callback(null, res);
  //     } else {
  //       console.log('Not Found in redis');
  //       var options = {
  //         page: parseInt(msg.page),
  //         limit: parseInt(msg.limit),
  //       };

  //       var filter = {};

  //       console.log('Filter:');
  //       console.log(filter)
  //       console.log('options:');
  //       console.log(options);

  //       product.paginate(filter,options,(err, results)=>{
  //         if(err){
  //           res.status = 500;
  //           res.message = 'Database Error';
  //           callback(null, res);
  //         }
  //         res.status = 200;
  //         res.message = results;
  //         console.log('Saving in Redis');
  //         redisClient.setex(msg.page, 36000, JSON.stringify(results));
  //         console.log('Saved in Redis');
  //         callback(null, res);
  //       });
  //     }
  //   });
  // } else if (msg.orderOn === '' && msg.order === '' && msg.sellerName === '' && msg.productName === '' && msg.productCategory === '' && msg.minPrice === '' && msg.maxPrice === '' && msg.minRating === '' && msg.maxRating === ''){
  //   console.log('Trying to fetch for seller from Redis');
  //   redisClient.get(msg.sellerEmailId+'_'+msg.page, (err, redisResult) => {
  //     if(err){
  //       res.status = 500;
  //       res.message = 'Redis Error';
  //       callback(null, res);
  //     }
  //     if(redisResult){
  //       console.log('Found in redis');
  //       res.status = 200;
  //       res.message = JSON.parse(redisResult);
  //       callback(null, res);
  //     } else {
  //       console.log('Not Found in redis');
  //       var options = {
  //         page: parseInt(msg.page),
  //         limit: parseInt(msg.limit),
  //       };

  //       var filter = {sellerEmailId: msg.sellerEmailId};

  //       console.log('Filter:');
  //       console.log(filter)
  //       console.log('options:');
  //       console.log(options);

  //       product.paginate(filter,options,(err, results)=>{
  //         if(err){
  //           res.status = 500;
  //           res.message = 'Database Error';
  //           callback(null, res);
  //         }
  //         res.status = 200;
  //         res.message = results;
  //         console.log('Saving in Redis');
  //         redisClient.setex(msg.sellerEmailId+'_'+msg.page, 36000, JSON.stringify(results));
  //         console.log('Saved in Redis');
  //         callback(null, res);
  //       });
  //     }
  //   });
  // } else {
    var options = {
      page: parseInt(msg.page),
      limit: parseInt(msg.limit),
    };
  
    if (msg.orderOn && msg.orderOn === "rating") {
      if (msg.order && msg.order === "asc") {
        options = Object.assign(options, {
          sort: { averageRating: 1 },
        });
      } else if (msg.order && msg.order === "desc") {
        options = Object.assign(options, {
          sort: { averageRating: -1 },
        });
      }
    } else if (msg.orderOn && msg.orderOn === "price") {
      if (msg.order && msg.order === "asc") {
        options = Object.assign(options, {
          sort: { productPrice: 1 },
        });
      } else if (msg.order && msg.order === "desc") {
        options = Object.assign(options, {
          sort: { productPrice: -1 },
        });
      }
    }
  
    var filter = {};
    if (msg.sellerEmailId && msg.sellerEmailId !== '') {
      filter = Object.assign(filter, {
        sellerEmailId: msg.sellerEmailId,
      });
    }
  
    // send productName='' if no productName given
    if(msg.productName && msg.productName !== ''){
      filter = Object.assign(filter, {
        productName: {$regex: ".*" + msg.productName + ".*",$options:'i'},
      });
    }
  
    // send sellerName='' if no sellerName given
    if(msg.sellerName && msg.sellerName !== ''){
      filter = Object.assign(filter, {
        sellerName: {$regex: ".*" + msg.sellerName + ".*",$options:'i'},
      });
    }
  
    // send productCategory='' to get products from all Category
    if(msg.productCategory && msg.productCategory !== ''){
      filter = Object.assign(filter, {
        productCategory: {$regex: ".*" + msg.productCategory + ".*",$options:'i'},
      });
    }
  
    // send minPrice ='' and maxPrice ='' if no filter on pricing required
    // send minPrice=200 and maxPrice='' to get all products with price >= 200
    if(msg.minPrice && msg.minPrice !== '' && msg.maxPrice && msg.maxPrice !== ''){
      filter = Object.assign(filter, {
        productPrice: {$gte:parseFloat(msg.minPrice),$lte:parseFloat(msg.maxPrice)},
      });
    } else if(msg.minPrice && msg.minPrice !== ''){
      filter = Object.assign(filter, {
        productPrice: {$gte:parseFloat(msg.minPrice)},
      });
    } else if(msg.maxPrice && msg.maxPrice !== ''){
      filter = Object.assign(filter, {
        productPrice: {$lte:parseFloat(msg.maxPrice)},
      });
    }
  
    // send minRating ='' and maxRating ='' if no filter on pricing required
    // send minRating=3.5 and maxRating='' to get all products with rating >= 3.5
    if(msg.minRating && msg.minRating !== '' && msg.maxRating && msg.maxRating !== ''){
      filter = Object.assign(filter, {
        averageRating: {$gte:parseFloat(msg.minRating),$lte:parseFloat(msg.maxRating)},
      });
    } else if(msg.minRating && msg.minRating !== ''){
      filter = Object.assign(filter, {
        averageRating: {$gte:parseFloat(msg.minRating)},
      });
    } else if(msg.maxRating && msg.maxRating !== ''){
      filter = Object.assign(filter, {
        averageRating: {$lte:parseFloat(msg.maxRating)},
      });
    }

    console.log("Filter:");
    console.log(filter);
    console.log("options:");
    console.log(options);

    product.paginate(filter, options, (err, results) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
        callback(null, res);
      }
      res.status = 200;
      res.message = results;
      callback(null, res);
    });
  // }
};

exports.getMultipleProducts = getMultipleProducts;
