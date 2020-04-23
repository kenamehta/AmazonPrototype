import { ADDTOSAVEFORLATER } from "./actionTypes";
import configPath from "../../../configApp";
import axios from "axios";

const addToSaveForLaterDispatcher = payload => {
  return {
    type: ADDTOSAVEFORLATER,
    payload
  };
};

export const addToSaveForLater = payload => {
  console.log("addToSaveForLater action");
  return dispatch => {
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );
    axios
      .post(
        configPath.api_host +
          `/customer/cartProducts/addToSaveForLater`,
        payload
      )
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          window.alert('Successfully Added to Save For Later');
          console.log(response.data);

          // Since we are not maintaining uniqueness property in the backend.
          const uniqueSavedProductsArray = []
          let map = new Map();
          for (const item of response.data) {
            if(!map.has(item.productId)){
                map.set(item.productId, true);    // set any value to Map
                uniqueSavedProductsArray.push(item);
            }
          }

          dispatch(addToSaveForLaterDispatcher({savedProductsArr:uniqueSavedProductsArray,savedCnt:uniqueSavedProductsArray.length}));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};
