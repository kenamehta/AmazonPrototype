"use strict";
const { Order, OrderProduct } = require("../../../models/order");
const product = require("../../../models/product.model");

let cancelOrders = async (msg, callback) => {
  let response = {};
  let err = {};
  try {
    const cancelproduct = OrderProduct.update(
      {cancelProduct:true},
      {
        where: {
            _id:msg._id 
        },
      }
    ).then(async resp=>{
   
    const orderproducts = await OrderProduct.findAll({
        where: {
          customer_email_id: msg.params.email,
          cancelProduct: false
        },
      order: [
        ['createdAt', 'DESC'],
     
    ],
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
    })
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

exports.cancelOrders = cancelOrders;
