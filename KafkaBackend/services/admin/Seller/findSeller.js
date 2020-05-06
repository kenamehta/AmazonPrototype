"use strict";
const seller = require("../../../models/seller.model");

const findSeller = (msg, callback) => {
  var res = {};
  console.log("msg in find seller list", msg);

  seller.find(
    { name: { $regex: ".*" + msg.name + ".*", $options: "i" } },
    (err, result) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
        callback(null, res);
      } else {
        res.status = 200;
        res.message = result;
        callback(null, res);
      }
    }
  );
};

exports.findSeller = findSeller;
