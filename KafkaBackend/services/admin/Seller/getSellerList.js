"use strict";
const category = require("../../../models/seller.model");

const getSellerList = (msg, callback) => {
  var res = {};

  seller.find({}, (err, results) => {
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

exports.getSellerList = getSellerList;
