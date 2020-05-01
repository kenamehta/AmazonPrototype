import { GET_SELLERS } from "./types.js";
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
