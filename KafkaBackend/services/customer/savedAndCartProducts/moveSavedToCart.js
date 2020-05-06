"use strict";
const customer = require("../../../models/customer.model");
const product = require("../../../models/product.model");

let moveSavedToCart = async (msg, callback) => {
  console.log(msg);
  let savedCnt = 0,
    cartCnt = 0;
  let savedIds = [],
    cartIds = [];
  customer
    .findOne({
      _id: msg.params.id,
      "savedProducts.productId": msg.productId
    })
    .then(async result => {
      console.log(result);
      if (result) {
        let idx = -1;
        for (let i = 0; i < result.savedProducts.length; i++) {
          if (result.savedProducts[i].productId == msg.productId) {
            idx = i;
            break;
          }
        }
        if (idx !== -1) {
          const individualProductPrice = parseFloat(msg.individualProductPrice);
          console.log(result.cartProducts);

          // checking if product already present then no moving to cart but removing from saved.
          // NOT increasing the quantity of product in cart too, if already present in cart
          const alreadyPresentIndex = result.cartProducts.findIndex((element)=>element.productId === msg.productId);
          if(alreadyPresentIndex === -1){
            let obj = Object.assign({},result.savedProducts[idx]._doc,{totalProductPrice:individualProductPrice}) ;
            console.log(obj);
            result.cartProducts.push(obj);
          }
          
          result.savedProducts.splice(idx, 1);

          if (result.savedProducts) {
            result.savedProducts.map(c => {
              savedIds.push(c.productId);
            });
          }
          if (result.cartProducts) {
            result.cartProducts.map(c => {
              cartIds.push(c.productId);
            });
          }
          const savedProductsArr = await product.find({
            _id: { $in: savedIds }
          });
          const cartProductsArr = await product.find({ _id: { $in: cartIds } });

          let totalProductCountInCart = 0;

          // The entire for loop is created by Sarthak to get cart Product information along with product info
          // getting cart products info like quantity, giftflag, giftmessage. 
          for(let i=0; i<cartProductsArr.length; i++) {
            const foundCartProduct = result.cartProducts.find((item) => item.productId == cartProductsArr[i]._id);
            //console.log(foundCartProduct);
            const newData = {
              quantity: foundCartProduct.quantity,
              giftFlag: foundCartProduct.giftFlag,
              giftMessage: foundCartProduct.giftMessage,
              totalProductPrice: foundCartProduct.totalProductPrice
            }
            totalProductCountInCart += foundCartProduct.quantity;
            // _doc contains product info.
            cartProductsArr[i] = Object.assign({},cartProductsArr[i]._doc,newData);
          }
          
          result
            .save()
            .then(() => {
              return callback(null, {
                status: 200,
                savedProductsArr,
                cartProductsArr,
                savedCnt: savedProductsArr.length,
                cartCnt: totalProductCountInCart
              });
            })
            .catch(err => {
              console.log(err);
              return callback(
                {
                  status: 500,
                  res: err
                },
                null
              );
            });
        } else {
          return callback(
            {
              status: 403,
              res: "Selected savedProduct not found"
            },
            null
          );
        }
      } else {
        return callback(
          {
            status: 403,
            res: "Unable to move"
          },
          null
        );
      }
    });
};

exports.moveSavedToCart = moveSavedToCart;
