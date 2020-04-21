import { DELETESAVEDPRODUCTS } from "./actionTypes";
import configPath from "../../../configApp";
import axios from "axios";

const deleteSavedProductsDispatcher = payload => {
  return {
    type: DELETESAVEDPRODUCTS,
    payload
  };
};

export const deleteSavedProducts = payload => {
  console.log("hello");
  return dispatch => {
    //make a delete request to delete product from saved
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );
    axios
      .delete(
        configPath.api_host +
          `/customer/cartProducts/saved/${localStorage.getItem("ID")}`,
        payload
      )
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(deleteSavedProductsDispatcher(response.data));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};
