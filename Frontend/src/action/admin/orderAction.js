import { GETADMINORDERS } from "./types";
import configPath from "../../configApp";
import axios from "axios";

const getAdminOrderDispatcher = (payload) => {
    return {
      type: GETADMINORDERS,
      payload,
    };
  };

  

export const getAdminOrders = (payload) => {
    axios.defaults.headers.common.authorization = localStorage.getItem("IDToken");
    return (dispatch) => {
      //make a get request to fetch customer profile
      axios
        .get(
          configPath.api_host +
            `/admin/orders/${payload.statusFilter}/${payload.sellerNameFilter}`
        )
        .then((response) => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            console.log(response.data);
            dispatch(getAdminOrderDispatcher(response.data));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };
  