import { MOVESAVEDTOCART } from "./actionTypes";
import configPath from "../../../configApp";
import axios from "axios";

const moveSavedToCartDispatcher = payload => {
  return {
    type: MOVESAVEDTOCART,
    payload
  };
};

export const moveSavedToCart = payload => {
  return dispatch => {
    //make a post request to move products from saved to cart
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );
    axios
      .post(
        configPath.api_host +
          `/customer/cartProducts/saved/${localStorage.getItem("ID")}`,
        payload
      )
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(moveSavedToCartDispatcher(response.data));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};
