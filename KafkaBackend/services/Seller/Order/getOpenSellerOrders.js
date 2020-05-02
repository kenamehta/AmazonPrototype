"use strict";
const { Order, OrderProduct } = require("../../../models/order");
const product = require("../../../models/product.model");
const { Op } = require("sequelize");

let getOpenSellerOrders = async (msg, callback) => {
  let response = {};
  let err = {};
  let orderid = [];
  try {
    const orderproducts = await OrderProduct.findAll({
      where: {
        seller_email_id: msg.params.emailId,
        cancelProduct: false,
        Status:{
            [Op.ne]:6
        } 
      },
      include: [
        {
          model: Order,
        },
      ],
    });

    let orderwithproduct = [];
    Promise.all(
      orderproducts.map(async (orderproduct) => {
        const products = await product.findOne({
          _id: orderproduct.dataValues.Product_id,
        });

        orderproduct.dataValues.products = products;

        orderwithproduct.push(orderproduct.dataValues);

        return products;
      })
    ).then((allData) => {
      response.data = orderwithproduct;
      response.status = 200;
      return callback(null, response);
    });
  } catch (error) {
    console.log(error);
    err.status = 500;
    err.data = {
      errors: {
        body: error,
      },
    };
    return callback(error, null);
  }
};

exports.getOpenSellerOrders = getOpenSellerOrders;
