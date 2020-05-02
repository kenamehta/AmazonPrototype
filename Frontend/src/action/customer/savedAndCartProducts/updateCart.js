import { UPDATECART } from "./actionTypes";
import configPath from "../../../configApp";
import axios from "axios";

const updateCartDispatcher = payload => {
  return {
    type: UPDATECART,
    payload
  };
};

export const updateCart = payload => {
  console.log("updateCart action");
  return dispatch => {
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );
    axios
      .post(
        configPath.api_host +
          `/customer/cartProducts/updateProductInCart`,
        payload
      )
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          //window.alert('Successfully Updated Cart');
          console.log(response.data);
          // Since we are not maintaining uniqueness property in the backend.
          const uniqueCartProductsArray = []
          let map = new Map();
          let totalProductCountInCart = 0;
          for (const item of response.data) {
            if(!map.has(item.productId)){
                map.set(item.productId, true);    // set any value to Map
                uniqueCartProductsArray.push(item);
                totalProductCountInCart += parseInt(item.quantity);
            }
          }

          dispatch(updateCartDispatcher({cartProductsArr:uniqueCartProductsArray,cartCnt:totalProductCountInCart}));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};