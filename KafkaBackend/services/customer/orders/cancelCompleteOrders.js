"use strict";
const { Order, OrderProduct } = require("../../../models/order");
const product = require("../../../models/product.model");

let cancelCompleteOrders = async (msg, callback) => {
  let response = {};
  let err = {};
  try {
  console.log(msg._id)
    const ifProductDelivered= await OrderProduct.findAll({
        where:{
            order_id: msg._id ,
            Status:'Delivered'
        }
    }
    )
    if(ifProductDelivered.length>0){
        console.log(ifProductDelivered)
        console.log("Product is already delivered")
        err.status = 500;
    err.data = {
      errors: {
        body: "Product is already delivered",
      },
    };
    return callback(err, null)
    }
  
  
    const cancelproduct = Order.update(
      {cancelOrder:true},
      {
        where: {
            order_id:msg._id 
        },
      }
    ).then(async resp=>{
        const cancelproduct = OrderProduct.update(
            {cancelProduct:true},
            {
              where: {
                  order_id:msg._id 
              },
            }
          ).then(async resp=>{
    
   
    const orderproducts = await OrderProduct.findAll({
        where: {
          customer_email_id: msg.params.email,
          cancelProduct: false
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
    })
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

exports.cancelCompleteOrders = cancelCompleteOrders;
