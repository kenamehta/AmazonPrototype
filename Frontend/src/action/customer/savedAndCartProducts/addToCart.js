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
        if (response.status === 200 || response.status === 201) {
          if(response.status === 200) {
            window.alert('Successfully Added to Cart');
          } else {
            window.alert('Added to Cart but quantity limited to 10 only!');
          } 
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

          dispatch(addToCartDispatcher({cartProductsArr:uniqueCartProductsArray,cartCnt:totalProductCountInCart}));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};
