import { GET_SELLERS, UPDATE_SELLER_LIST } from "./types.js";
import axios from "axios";
import configPath from "../../configApp";

export const getSeller = () => (dispatch) => {
  // dispatch(setCategoryLoading());
  axios
    .get(configPath.api_host + "/admin/seller/getSellerList")
    .then((res) => {
      console.log("My sellers", res.data);
      return dispatch({
        type: GET_SELLERS,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// export const updateSellerList = (name) => {
//   console.log(name);
//   return {
//     type: UPDATE_SELLER_LIST,
//     payload: name,
//   };
// };

export const updateSellerList = (name) => (dispatch) => {
  console.log(name, "this is what you have sent");
  axios
    .post(configPath.api_host + `/admin/seller/findSeller`, name)
    .then((res) => {
      console.log("johny", res.data);
      return dispatch({
        type: UPDATE_SELLER_LIST,
        payload: res.data,
      });
    });
};
