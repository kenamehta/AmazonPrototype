"use strict";
const category = require("../../../models/category.model");

const addProductCategory = (msg, callback) => {
  var res = {};
  console.log("msg", msg);
  let categoryToCreate = category({
    name: msg.name,
  });

  categoryToCreate.save((err, result) => {
    console.log("err", err);
    console.log("cat", result);
    if (err) {
      res.status = 500;
      res.message = "Database Error";
    } else {
      res.status = 200;
      res.message = result;
    }
    callback(null, res);
  });
};

exports.addProductCategory = addProductCategory;
