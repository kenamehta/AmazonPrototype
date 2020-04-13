import { LOGIN, REGISTERCUSTOMER, REGISTERSELLER, LOGOUT } from "./actionTypes";
import configPath from "./../../configApp";
import axios from "axios";

//Log In Dispatcher
const loginDispatcher = payload => {
  return {
    type: LOGIN,
    payload
  };
};

//login thunk function. Delays dispatcher
export const login = payload => {
  return dispatch => {
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(configPath.api_host + "/login", payload)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          localStorage.setItem("loginFlag", "true");
          dispatch(loginDispatcher({ ...response.data, loginFlag: true }));
        }
      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          console.log("inside error of thunk ", {
            ...error.response.data,
            loginFlag: false
          });
          dispatch(
            loginDispatcher({ ...error.response.data, loginFlag: false })
          );
        } else {
          dispatch(loginDispatcher({ res: "Network error", loginFlag: false }));
        }
      });
  };
};


