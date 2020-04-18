"use strict";
const category = require("../../../models/category.model");

const addProductCategory = (msg, callback) => {
  var res = {};

  let categoryToCreate = category({
    name: msg.categoryName
  });

  categoryToCreate.save((categorySaveError) => {
    if(categorySaveError){
      res.status = 500;
      res.message = 'Database Error';
    } else {
      res.status = 200;
      res.message = 'Success';
    }
    callback(null, res);
  })
}

exports.addProductCategory = addProductCategory;