import {  GETSELLERORDERS,CANCELSELLERORDERPRODUCT} from "./actionType";
import configPath from "../../../configApp";
import axios from "axios";

const getSellerOrderDispatcher = (payload) => {
  return {
    type: GETSELLERORDERS,
    payload,
  };
};
const cancelSellerOrderProductDispatcher = (payload) => {
  return {
    type: CANCELSELLERORDERPRODUCT,
    payload,
  };
};




export const getSellerOrders = () => {
  axios.defaults.headers.common.authorization = localStorage.getItem("IDToken");
  return (dispatch) => {
    //make a get request to fetch customer profile
    axios
      .get(
        configPath.api_host +
          `/seller/orders/${localStorage.getItem("emailId")}`
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(getSellerOrderDispatcher(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};



export const cancelSellerOrderProducts = (payload) => {
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
          dispatch(cancelSellerOrderProductDispatcher(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};


