import { GETSAVEDPRODUCTS } from "./actionTypes";
import configPath from "../../../configApp";
import axios from "axios";

const getSavedAndCartProductsDispatcher = payload => {
  return {
    type: GETSAVEDPRODUCTS,
    payload
  };
};

export const getSavedAndCartProducts = () => {
  console.log("hello");
  return dispatch => {
    //make a get request to fetch saved Products
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );
    axios
      .get(
        configPath.api_host +
          `/customer/cartProducts/${localStorage.getItem("ID")}`
      )
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(getSavedAndCartProductsDispatcher(response.data));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};
