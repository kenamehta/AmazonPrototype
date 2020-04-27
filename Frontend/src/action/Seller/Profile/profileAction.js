import axios from 'axios';
import configPath from "../../../configApp";
import { SELLERPROFILE, SELLERUPDATEPROFILEPICTURE, SELLERUPDATEPROFILE } from './actionType';

export const getSellerProfile = (data) => (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('IDToken');
  //axios.defaults.withCredentials = true;
  axios.get(configPath.api_host + "/seller/profile/" + data.emailId)
  .then((resp) => {
    if(resp.status === 200){
      dispatch({
        type: SELLERPROFILE,
        payload: resp.data
      })
    }
  }).catch((err) => {
    console.log(err);
  });
}

export const updateSellerProfilePicture = (data) => (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('IDToken');
  //axios.defaults.withCredentials = true;
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  axios.post(configPath.api_host + "/seller/profile/updateProfilePicture", data, config)
  .then((response) => {
    if(response.status === 200 ){
      window.alert('Profile Picture Changed Successfully');
      dispatch({
        type:SELLERUPDATEPROFILEPICTURE,
        payload:response.data.profilePictureUrl
      });
      // since the profilePictureUrl is the same, the dispatch is not changing the store
      // and thus need to manually refresh the page to get updated image.
      window.location.reload();
    }
  }).catch((err)=> {
    console.log(err);
  });
}

export const updateSellerDetails = (data) => (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('IDToken');
  //axios.defaults.withCredentials = true;
  axios.post(configPath.api_host + "/seller/profile/updateProfileDetails", data)
  .then((response) => {
    if(response.status === 200 ){
      window.alert('Profile Details Updated Successfully');
      dispatch({
        type:SELLERUPDATEPROFILE,
        payload:response.data
      });
      // To get updated seller name in the products.
      // not sending list of seller products from backend.
      window.location.reload();
    }
  }).catch((err)=> {
    console.log(err);
  });
}