import { REGISTERCUSTOMER } from "./actionTypes";
import configPath from "./../../configApp";
import axios from "axios";

//Customer Register Dispatacher
const registerCustomerDispatcher = payload => {
  console.log("Inside registerCustomerDispatcher action");
  console.log("payload", payload);
  return {
    type: REGISTERCUSTOMER,
    payload
  };
};

//Delayed dispatch to make async call for Customer data
export const registerCustomer = payload => {
  console.log("Inside registerCustomer thunk");

  return dispatch => {
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(configPath.api_host + "/registerCustomer", payload)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          dispatch(
            registerCustomerDispatcher({
              ...response.data,
              registerFlag: true
            })
          );
        }
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
          dispatch(
            registerCustomerDispatcher({
              ...error.response.data,
              registerFlag: false
            })
          );
        } else {
          dispatch(
            registerCustomerDispatcher({
              res: "Network error",
              registerFlag: false
            })
          );
        }
      });
  };
};
