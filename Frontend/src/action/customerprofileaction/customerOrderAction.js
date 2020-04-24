import { GETORDERS, CANCELORDERPRODUCT } from "./actionType";
import configPath from "../../configApp";
import axios from "axios";

const getOrderDispatcher = (payload) => {
  return {
    type: GETORDERS,
    payload,
  };
};
const cancelOrderProductDispatcher = (payload) => {
  return {
    type: CANCELORDERPRODUCT,
    payload,
  };
};

export const getOrders = () => {
  axios.defaults.headers.common.authorization = localStorage.getItem("IDToken");
  return (dispatch) => {
    //make a get request to fetch customer profile
    axios
      .get(
        configPath.api_host +
          `/customer/orders/${localStorage.getItem("emailId")}`
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(getOrderDispatcher(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const cancelOrderProducts = (payload) => {
  axios.defaults.headers.common.authorization = localStorage.getItem("IDToken");
  return (dispatch) => {
    //make a get request to fetch customer profile
    axios
      .post(
        configPath.api_host +
          `/customer/orders/cancel/product/${localStorage.getItem("emailId")}`,payload
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(cancelOrderProductDispatcher(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
