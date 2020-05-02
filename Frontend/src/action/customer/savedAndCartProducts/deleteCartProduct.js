import { DELETECARTPRODUCT } from "./actionTypes";
import configPath from "../../../configApp";
import axios from "axios";

const deleteCartProductDispatcher = payload => {
  return {
    type: DELETECARTPRODUCT,
    payload
  };
};

export const deleteCartProduct = payload => {
  console.log("hello");
  console.log(payload);
  return dispatch => {
    //make a delete request to delete product from saved
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );
    axios
      .delete(
        configPath.api_host +
          `/customer/cartProducts/cart/${payload.data.data._id}`,
        payload.data
      )
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);

          const uniqueCartProductsArray = []
          const map = new Map();
          let totalProductCountInCart = 0;
          for (const item of response.data) {
            if(!map.has(item.productId)){
                map.set(item.productId, true);    // set any value to Map
                uniqueCartProductsArray.push(item);
                totalProductCountInCart += parseInt(item.quantity);
            }
          }
          dispatch(deleteCartProductDispatcher({cartProductsArr:uniqueCartProductsArray,cartCnt:totalProductCountInCart}));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};
