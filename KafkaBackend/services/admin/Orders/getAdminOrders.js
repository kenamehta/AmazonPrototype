"use strict";
const { Order, OrderProduct } = require("../../../models/order");
const seller = require('../../../models/seller.model');

const product = require("../../../models/product.model");
const { Op } = require("sequelize");
let getAdminOrders = async (msg, callback) => {
  let response = {};
  let err = {};
  
  try {

    if(msg.params.sellerNameFilter=='empty'&&msg.params.statusFilter=='empty'){
    const orderproducts = await OrderProduct.findAll({
     
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
        console.log(orderwithproduct)
      response.data = orderwithproduct;
      response.status = 200;
      return callback(null, response);
    });
  }
 else{
  var whereCond=''
  var sqlWhereCond=''
  console.log(msg.params.sellerNameFilter)
  if(msg.params.sellerNameFilter!='empty'){
    whereCond={
      ...whereCond,
    name  : { $regex: new RegExp(msg.params.sellerNameFilter, "i") }
    }
    const sellerarr=await seller.find(whereCond)
    console.log(sellerarr)
    let emailarr=[]
    sellerarr.map(seller=>(emailarr.push(seller.emailId)))
    console.log(emailarr)
    sqlWhereCond={
     ...sqlWhereCond,
      seller_email_id:emailarr
     
    }

  }


  if(msg.params.statusFilter!='empty')
  {
    sqlWhereCond={
    ...sqlWhereCond,
    status: msg.params.statusFilter
    } 
  }
    const orderproducts = await OrderProduct.findAll({
     
      order: [
        ['createdAt', 'DESC'],
     
    ],
    where:sqlWhereCond,
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
        console.log(orderwithproduct)
      response.data = orderwithproduct;
      response.status = 200;
      return callback(null, response);
    })
  }
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

exports.getAdminOrders = getAdminOrders;
