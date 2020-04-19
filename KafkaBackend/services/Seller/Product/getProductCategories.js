"use strict";
const category = require("../../../models/category.model");

const getProductCategories = (msg, callback) => {
  var res = {};

  category.find({}, (err, results) => {
    if(err){
      res.status = 500;
      res.message = 'Database Error';
      callback(null, res);
    }
    // do i give you some other status code and message if there are no product categories in the db?
    res.status = 200;
    res.message = results;
    callback(null, res);
  });
};

exports.getProductCategories = getProductCategories;