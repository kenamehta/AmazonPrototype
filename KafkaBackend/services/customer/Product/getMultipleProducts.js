"use strict";
const product = require("../../../models/product.model");

const getMultipleProducts = (msg, callback) => {
  var res = {};
  console.log('Inside getMultipleProducts in kafka');
  console.log(msg);
  var options = {
    page: parseInt(msg.page),
    limit: parseInt(msg.limit),
  };

  switch (msg.sort) {
    case "Rating - Asc":
      options = Object.assign(options, {
        sort: { averageRating: 1 },
      });
      break;
    case "Rating - Dsc":
      options = Object.assign(options, {
        sort: { averageRating: -1 },
      });
      break;
  }

  var filter = {};
  if (msg.sellerEmailId) {
    filter = Object.assign(filter, {
      sellerEmailId: msg.sellerEmailId,
    });
  }

  product.paginate(filter,options,(err, results)=>{
    if(err){
      res.status = 500;
      res.message = 'Database Error';
      callback(null, res);
    }
    res.status = 200;
    res.message = results;
    callback(null, res);
  });
}

exports.getMultipleProducts = getMultipleProducts;