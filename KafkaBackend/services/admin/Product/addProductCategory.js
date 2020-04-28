"use strict";
const category = require("../../../models/category.model");

const addProductCategory = (msg, callback) => {
  var res = {};
  console.log("msg 5", msg);

  category.findOne(
    { name: { $regex: "^" + msg.name + "$", $options: "i" } },
    (err, existingCategory) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
        callback(null, res);
      }
      if (!existingCategory) {
        let categoryToCreate = category({
          name: msg.name,
        });
        categoryToCreate.save((categorySaveError, result) => {
          console.log("Result of Category!", result);
          if (categorySaveError) {
            res.status = 500;
            res.message = "Database Error";
            callback(null, res);
          } else {
            res.status = 200;
            res.message = result;
            callback(null, res);

            /*category.find({}, (err, result) => {
              if (err) {
                res.status = 500;
                res.message = "Database Error";
                callback(null, res);
              }
              res.status = 200;
              res.message = result;
              callback(null, res);
           // });*/
          }
        });
      } else {
        res.status = 200;
        res.message = "CannotAdd";
        callback(null, res);
        // category.find({}, (err, result) => {
        //   if (err) {
        //     res.status = 500;
        //     res.message = "Database Error";
        //     callback(null, res);
        //   }
        //   res.status = 200;
        //   res.message = result;
        //   callback(null, res);
        // });
      }
    }
  );
};

exports.addProductCategory = addProductCategory;

// "use strict";
// const category = require("../../../models/category.model");

// const addProductCategory = (msg, callback) => {
//   var res = {};
//   console.log("msg", msg);
//   let categoryToCreate = category({
//     name: msg.name,
//   });

//   categoryToCreate.save((err, result) => {
//     console.log("err", err);
//     console.log("cat", result);
//     if (err) {
//       res.status = 500;
//       res.message = "Database Error";
//     } else {
//       res.status = 200;
//       res.message = result;
//     }
//     callback(null, res);
//   });
// };

// exports.addProductCategory = addProductCategory;
