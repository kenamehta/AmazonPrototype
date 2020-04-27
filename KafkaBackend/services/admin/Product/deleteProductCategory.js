"use strict";
const category = require("../../../models/category.model");

const deleteProductCategory = (msg, callback) => {
  var res = {};

  category.deleteOne(
    {
      name: { $regex: "^" + msg.categoryName + "$", $options: "i" },
      productCount: 0,
    },
    (err, result) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
        callback(null, res);
      }
      console.log(result.deletedCount);
      if (result.deletedCount === 0) {
        res.status = 400;
        res.message = "Cannot delete. This category has products mapped to it";
        callback(null, res);
      } else {
        category.find({}, (err, result) => {
          if (err) {
            res.status = 500;
            res.message = "Database Error";
            callback(null, res);
          }
          res.status = 200;
          res.message = result;
          callback(null, res);
        });
      }
    }
  );
};

exports.deleteProductCategory = deleteProductCategory;
