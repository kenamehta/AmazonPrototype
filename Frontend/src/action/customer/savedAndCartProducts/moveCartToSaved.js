import { MOVECARTTOSAVED } from "./actionTypes";
import configPath from "../../../configApp";
import axios from "axios";

const moveCartToSavedDispatcher = payload => {
  return {
    type: MOVECARTTOSAVED,
    payload
  };
};

export const moveCartToSaved = payload => {
  console.log('Inside action of moveCartToSaved');
  console.log(payload);
  return dispatch => {
    //make a post request to move products from saved to cart
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );
    axios
      .post(
        configPath.api_host +
          `/customer/cartProducts/moveFromCartToSaveForLater`,
        payload
      )
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);

          // Since we are not maintaining uniqueness property in the backend.
          const uniqueSavedProductsArray = []
          let map = new Map();
          for (const item of response.data.savedProductsArray) {
            if(!map.has(item.productId)){
                map.set(item.productId, true);    // set any value to Map
                uniqueSavedProductsArray.push(item);
            }
          }

          const uniqueCartProductsArray = []
          map = new Map();
          let totalProductCountInCart = 0;
          for (const item of response.data.cartProductsArray) {
            if(!map.has(item.productId)){
                map.set(item.productId, true);    // set any value to Map
                uniqueCartProductsArray.push(item);
                totalProductCountInCart += parseInt(item.quantity);
            }
          }

          const dataToDispatch = {
            savedProductsArr:uniqueSavedProductsArray,
            cartProductsArr:uniqueCartProductsArray,
            savedCnt:uniqueSavedProductsArray.length,
            cartCnt:totalProductCountInCart
          }

          console.log(dataToDispatch);
          dispatch(moveCartToSavedDispatcher(dataToDispatch));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};
