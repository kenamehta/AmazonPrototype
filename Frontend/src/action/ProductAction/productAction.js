import { GET_PRODUCT } from "./actionType";
import configPath from "../../configApp";
import axios from "axios";

const getProductDispatcher = (payload) => {
  return {
    type: GET_PRODUCT,
    payload,
  };
};

export const getProduct = (productId) => async (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem("IDToken");

  console.log("CALINGGG");
  try {
    const res = await axios.get(
      configPath.api_host + `/product/customer/list/${productId}`
    );

    if (res.status === 200) {
      console.log(res.data);
      dispatch(getProductDispatcher(res.data));
    }
  } catch (error) {
    console.log(error);
  }
};
