"use strict";
const category = require("../../../models/category.model");

const getProductCategory = (msg, callback) => {
  var res = {};

  // let categoryToGet = category({
  //   name: msg.categoryName,
  // });

  category.find({}, (err, results) => {
    if (err) {
      res.status = 500;
      res.message = "Database Error";
      callback(null, res);
    }

    res.status = 200;
    res.message = results;
    callback(null, res);
  });
};

exports.getProductCategory = getProductCategory;
