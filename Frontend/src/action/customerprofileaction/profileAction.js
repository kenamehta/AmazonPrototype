import { GETPROFILE, UPDATEPROFILE, UPDATEPROFILEPIC } from "./actionType";
import configPath from "../../configApp";
import axios from 'axios';

//GET PROFILE Dispatcher
const getProfileDispatcher = (payload) => {
  return {
    type: GETPROFILE,
    payload,
  };
};

//update profile Dispatcher
const updateProfileDispatcher = (payload) => {
  return {
    type: UPDATEPROFILE,
    payload,
  };
};

//update profile Dispatcher
const updateProfilePicDispatcher = (payload) => {
  return {
    type: UPDATEPROFILEPIC,
    payload,
  };
};

//login thunk function. Delays dispatcher
export const getProfile = () => {
  return (dispatch) => {
    //make a get request to fetch customer profile
    axios
      .get(
        configPath.api_host +
          `/customer/profile/${localStorage.getItem("emailId")}`
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(getProfileDispatcher(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateProfile = (payload) => {
  return (dispatch) => {
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );

    //make a put request to update customer profile
    console.log("in update profile action");
    axios
      .put(
        configPath.api_host + `/customer/profile/updateProfileDetails`,
        payload
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(updateProfileDispatcher(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//thunk for updating profile pic for customer
export const updateProfilePicture = (payload) => {
  return (dispatch) => {
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    //make a put request to update customer profile pic
    console.log("in update profile action");
    axios
      .put(
        configPath.api_host + `/customer/profile/updateProfilePicture`,
        payload,
        config
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(updateProfilePicDispatcher(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
