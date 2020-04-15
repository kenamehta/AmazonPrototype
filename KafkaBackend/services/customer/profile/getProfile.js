"use strict";
const bcrypt = require("bcrypt");

const customer = require('../../../models/customer.model');
const comment=require('../../../models/comment.model')


let getProfile = async (msg, callback) => {
    let response = {};
    let err = {};

    const mainCustomer= await customer.findOne({
        emailId:msg.body.emailId
    })
    const insights= await comment.find({
        customerId:mainCustomer._id
    })

    
   mainCustomer= {...mainCustomer,insights,comment_cnt:insights.length()}





    
};

exports.getProfile = getProfile;