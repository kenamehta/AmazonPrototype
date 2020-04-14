import { REGISTERSELLER } from "./actionTypes";
import configPath from "./../../configApp";
import axios from "axios";

//Seller Register Dispatacher
const registerSellerDispatcher = payload => {
  console.log("Inside registerSellerDispatcher action");
  console.log("payload", payload);
  return {
    type: REGISTERSELLER,
    payload
  };
};

//refresh flags
export const refreshFlags = payload => {
  return {
    type: "REFRESHFLAGS",
    payload
  };
};

//Delayed dispatch to make async call for Customer data
export const registerSeller = payload => {
  console.log("Inside registerSeller thunk");

  return dispatch => {
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(configPath.api_host + "/registerSeller", payload)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          dispatch(
            registerSellerDispatcher({ ...response.data, registerFlag: true })
          );
        }
      })
      .catch(error => {
        console.log(error.response.data);
        if (error.response) {
          dispatch(
            registerSellerDispatcher({
              ...error.response.data,
              registerFlag: false
            })
          );
        } else {
          dispatch(
            registerSellerDispatcher({
              res: "Network error",
              registerFlag: false
            })
          );
        }
      });
  };
};
