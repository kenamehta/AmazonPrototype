"use strict";
const category = require("../../../models/category.model");

const addProductCategory = (msg, callback) => {
  var res = {};

  category.findOne({ name:{'$regex':'^'+msg.categoryName+'$',$options:'i'}},(err, existingCategory) => {
    if(err){
      res.status = 500;
      res.message = 'Database Error';
      callback(null, res);
    }
    if(!existingCategory){
      let categoryToCreate = category({
        name: msg.categoryName
      });
      categoryToCreate.save((categorySaveError) => {
        if(categorySaveError){
          res.status = 500;
          res.message = 'Database Error';
          callback(null, res);
        } else {
          category.find({},(err, result) => {
            if(err){
              res.status = 500;
              res.message = 'Database Error';
              callback(null, res);
            } 
            res.status = 200;
            res.message = result;
            callback(null, res);
          });
        }
      })
    } else {
      category.find({},(err, result) => {
        if(err){
          res.status = 500;
          res.message = 'Database Error';
          callback(null, res);
        } 
        res.status = 200;
        res.message = result;
        callback(null, res);
      });
    }
  })

  
}

exports.addProductCategory = addProductCategory;
