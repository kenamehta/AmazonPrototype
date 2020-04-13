import axios from 'axios';
import configPath from "./../../configApp";
import { SELLERPROFILE, UPDATEPROFILEPICTURE, UPDATEPROFILE } from './actionTypes';

export const getSellerProfile = (data) => (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');
  axios.defaults.withCredentials = true;
  axios.get(configPath.api_host + "/sellers/:" + data.sellerEmailId)
  .then((resp) => dispatch({
    type: SELLERPROFILE,
    payload: resp.data
  })).catch((err) => {
    console.log(err);
  });
}

export const updateSellerProfilePicture = (data) => (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');
  axios.defaults.withCredentials = true;
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  axios.post(configPath.api_host + "/seller/updateProfilePicture", data, config)
  .then((response) => {
    if(response.status === 200 ){
      window.alert('Profile Picture Changed Successfully');
      dispatch({
        type:UPDATEPROFILEPICTURE,
        payload:response.data
      });
    }
  }).catch((err)=> {
    console.log(err);
  });
}

export const updateSellerDetails = (data) => (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');
  axios.defaults.withCredentials = true;
  axios.post(configPath.api_host + "/seller/updateProfileDetails", data)
  .then((response) => {
    if(response.status === 200 ){
      window.alert('Profile Details Updated Successfully');
      dispatch({
        type:UPDATEPROFILE,
        payload:response.data
      });
    }
    //window.location.reload();
  }).catch((err)=> {
    console.log(err);
  });
}