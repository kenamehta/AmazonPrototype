import { GETPROFILE} from "./actionType";
import configPath from "./../../configApp";
import axios from "axios";

//Log In Dispatcher
const getProfileDispatcher = () => {
  return {
    type: GETPROFILE

  };
};

//login thunk function. Delays dispatcher
export const getProfile = () => {
  return dispatch => {
   
    //make a get request to fetch customer profile
    axios
      .get(configPath.api_host + `/customer/profile/${}`, payload)
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
