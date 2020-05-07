"use strict";
const { Order, OrderProduct } = require("../../../models/order");
const product = require("../../../models/product.model");
const { Op } = require("sequelize");
let getSellerCancelOrder = async (msg, callback) => {
  let response = {};
  let err = {};
  let orderid = [];
  try {
    const orderproducts = await OrderProduct.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {
                customer_email_id: {
                  [Op.eq]: msg.params.email,
                },
              },
              {
                seller_email_id: {
                  [Op.eq]: msg.params.email,
                },
              },
            ],
          },
          { [Op.or]: [
            {
                cancelProduct: true
            },
            {
              Status:'6'
            },
          ], },
         
        ],
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

exports.getSellerCancelOrder = getSellerCancelOrder;
