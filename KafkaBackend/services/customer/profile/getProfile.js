"use strict";
const bcrypt = require("bcrypt");

const customer = require('../../../models/customer.model');
const comment=require('../../../models/comment.model')


let getProfile = async (msg, callback) => {
    let response = {};
    let err = {};
    try{
    console.log(msg.params)
    let mainCustomer= await customer.findOne({
        emailId:msg.params
    })
    console.log(mainCustomer)
    const insights= await comment.find({
        customerId:mainCustomer._id
    })
    console.log(insights)

    
   mainCustomer= {...mainCustomer,insights,comment_cnt:insights.length}
   (response.data = mainCustomer), (response.status = 201);
   return callback(null, response);
    }
    catch(error)
    {

    }



    
};

exports.getProfile = getProfile;