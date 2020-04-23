import { ADDTOCART } from "./actionTypes";
import configPath from "../../../configApp";
import axios from "axios";

const addToCartDispatcher = payload => {
  return {
    type: ADDTOCART,
    payload
  };
};

export const addToCart = payload => {
  console.log("addToCart action");
  return dispatch => {
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );
    axios
      .post(
        configPath.api_host +
          `/customer/cartProducts/addToCart`,
        payload
      )
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          window.alert('Successfully Added to Cart');
          console.log(response.data);

          // Since we are not maintaining uniqueness property in the backend.
          const uniqueCartProductsArray = []
          let map = new Map();
          for (const item of response.data) {
            if(!map.has(item.productId)){
                map.set(item.productId, true);    // set any value to Map
                uniqueCartProductsArray.push(item);
            }
          }

          dispatch(addToCartDispatcher({cartProductsArr:uniqueCartProductsArray,cartCnt:uniqueCartProductsArray.length}));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};
