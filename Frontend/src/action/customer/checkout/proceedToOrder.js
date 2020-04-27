import { PROCEEDTOORDER } from "./actionTypes";
import configPath from "../../../configApp";
import axios from "axios";

const proceedToOrderDispatcher = payload => {
  return {
    type: PROCEEDTOORDER,
    payload
  };
};

export const proceedToOrder = payload => {
  return dispatch => {
    //make a post request to move products from saved to cart
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );
    axios
      .post(
        configPath.api_host +
          `/customer/checkout/${localStorage.getItem("ID")}`,
        payload
      )
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(proceedToOrderDispatcher(response.data));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};
