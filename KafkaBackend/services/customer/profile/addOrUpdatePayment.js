"use strict";
var express = require("express");
const customer = require("../../../models/customer.model");
const Mongoose = require("mongoose");

let addOrUpdatePayment = async (msg, callback) => {
  console.log(msg);
  customer
    .findOne({
      _id: msg.params.id,
      "paymentCards._id": msg.card_id
    })
    .then(async result => {
      console.log(result + "res found");
      if (result) {
        const newPayment = {
          cardName: msg.cardName,
          cardNumber: msg.cardNumber,
          expirationDate: msg.expirationDate,
          cvv: msg.cvv
        };
        //const cust = await customer.findOne({ _id: msg.params.id });
        var paymentArr = result.paymentCards;
        let idx = -1;
        for (let i = 0; i < paymentArr.length; i++) {
          if (paymentArr._id == msg.card_id) {
            idx = i;
            break;
          }
        }
        var EXPERIENCE_other = EXPERIENCE.filter(ex => {
          console.log(ex.COMPANY_NAME);
          return ex.COMPANY_NAME != msg.COMPANY_NAME;
        });
        var EXPERIENCE_update = EXPERIENCE.filter(ex => {
          console.log(ex.COMPANY_NAME);
          return ex.COMPANY_NAME == msg.COMPANY_NAME;
        });
        let title = msg.TITLE ? msg.TITLE : EXPERIENCE_update[0].TITLE;
        let location = msg.LOCATION
          ? msg.LOCATION
          : EXPERIENCE_update[0].LOCATION;
        let start_date = msg.START_DT
          ? msg.START_DT
          : EXPERIENCE_update[0].START_DT;
        let end_date = msg.END_DT ? msg.END_DT : EXPERIENCE_update[0].END_DT;
        let work_desc = msg.WORK_DESC
          ? msg.WORK_DESC
          : EXPERIENCE_update[0].WORK_DESC;
        try {
          console.log(title + " major found");
          console.log(location + " yop found");
          console.log(start_date + " gpa found");
          EXPERIENCE_other.push({
            COMPANY_NAME: msg.COMPANY_NAME,
            TITLE: title,
            LOCATION: location,
            START_DT: start_date,
            END_DT: end_date,
            WORK_DESC: work_desc
          });
          console.log(EXPERIENCE_other);
          let query = {
            _id: msg.params.sid
          };
          let update = {
            EXPERIENCE: EXPERIENCE_other
          };
          let options = { new: true, useFindAndModify: false };
          let experienceAdd = await Student.findOneAndUpdate(
            query,
            update,
            options
          );
          if (experienceAdd)
            return callback(null, {
              status: 200,
              experience: experienceAdd.EXPERIENCE
            });
          else return callback({ status: 403 }, null);
        } catch (err) {
          console.log(err);
          return callback({ status: 500 }, null);
        }
      } else {
        console.log("in else");
        const Stu = await Student.findOne({ _id: msg.params.sid });
        const EXPERIENCE = Stu.EXPERIENCE;

        EXPERIENCE.push({
          COMPANY_NAME: msg.COMPANY_NAME,
          TITLE: msg.TITLE,
          LOCATION: msg.LOCATION,
          START_DT: msg.START_DT,
          END_DT: msg.END_DT,
          WORK_DESC: msg.WORK_DESC
        });
        console.log(EXPERIENCE);
        const updated = await Stu.save();
        const afterAdd = await Student.findOne({
          _id: msg.params.sid
        });
        if (afterAdd)
          return callback(null, {
            status: 200,
            experience: afterAdd.EXPERIENCE
          });
        else return callback({ status: 403 }, null);
      }
    });
};

exports.addOrUpdatePayment = addOrUpdatePayment;
