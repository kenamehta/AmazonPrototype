import { CATEGORY } from "./actionType";
import configPath from "../../configApp";
import axios from "axios";

const getCategoryDispatcher = (payload) => {
  return {
    type: CATEGORY,
    payload,
  };
};

export const getCategory = () => {
  console.log("hello");
  return (dispatch) => {
    //make a get request to fetch customer profile
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );
    axios
      .get(configPath.api_host + `/product/seller/productCategories`)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(getCategoryDispatcher(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
