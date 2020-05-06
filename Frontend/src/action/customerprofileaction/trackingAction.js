import { GETTRACKING, UPDATETRACKING } from "./actionType";
import configPath from "../../configApp";
import axios from "axios";

//GET TRACKING Dispatcher
const getTrackingDispatcher = payload => {
  return {
    type: GETTRACKING,
    payload
  };
};

//UPDATE TRACKING Dispatcher
const updateTrackingDispatcher = payload => {
  return {
    type: UPDATETRACKING,
    payload
  };
};

//get tracking function. Delays dispatcher
export const getTracking = payload => {
  return dispatch => {
    //make a get request to get tracking info
    axios
      .get(configPath.api_host + `/product/status/${payload.orderProductId}`)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(getTrackingDispatcher(response.data));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};

//update tracking function. Delays dispatcher
export const updateTracking = payload => {
  return dispatch => {
    //make a get request to get tracking info
    axios
      .post(configPath.api_host + `/product/status/${payload.orderProductId}`, {
        status: payload.status
      })
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(updateTrackingDispatcher(response.data));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};
