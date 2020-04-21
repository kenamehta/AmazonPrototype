"use strict";
const bcrypt = require("bcrypt");

const customer = require("../../../models/customer.model");
const comment = require("../../../models/comment.model");
const product= require("../../../models/product.model")

let getProfile = async (msg, callback) => {
  let response = {};
  let err = {};
  try {
    console.log(msg.params);
    let mainCustomer = await customer.findOne({
      emailId: msg.params,
    });
    //console.log(mainCustomer);
    // const insights = await comment.find({
    //   customerId: mainCustomer._id
    // })
    const insights = await comment.aggregate([{
     "$match" : { customerId: mainCustomer._id+''}
    },
    // {
    //   "$project": {
    //     "newproductId": {
    //       "$toObjectId": "$productId"
    //     }
    //   }
    // },
    {
     "$lookup":{
       "from":"product",
       "localField":"newproductId",
       "foreignField":"_id",
       "as":"products"
     } 
    }
  ]);
    console.log(insights);

    mainCustomer = { mainCustomer, insights, comment_cnt: insights.length };
    console.log(mainCustomer);

    (response.data = mainCustomer), (response.status = 200);
    return callback(null, response);
  } catch (error) {
    console.log(error);
    err.status = 500;
    err.data = {
      errors: {
        body: error,
      },
    };
    return callback(err, null);
  }
};

exports.getProfile = getProfile;
