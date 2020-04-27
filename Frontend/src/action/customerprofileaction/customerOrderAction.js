import { GETORDERS, CANCELORDERPRODUCT,GETCANCELORDER,GETOPENORDERS,CANCELCOMPLETEORDERS } from "./actionType";
import configPath from "../../configApp";
import axios from "axios";

const getOrderDispatcher = (payload) => {
  return {
    type: GETORDERS,
    payload,
  };
};
const cancelOrderProductDispatcher = (payload) => {
  return {
    type: CANCELORDERPRODUCT,
    payload,
  };
};


const getCancelOrderDispatcher = (payload) => {
  console.log(payload)
  return {
    type: GETCANCELORDER,
    payload,
  };
};

const getOpenOrderDispatcher = (payload) => {
  console.log(payload)
  return {
    type: GETOPENORDERS,
    payload,
  };
};

const cancelCompleteOrderDispatcher = (payload) => {
  return {
    type: CANCELCOMPLETEORDERS,
    payload,
  };
};




export const getOrders = () => {
  axios.defaults.headers.common.authorization = localStorage.getItem("IDToken");
  return (dispatch) => {
    //make a get request to fetch customer profile
    axios
      .get(
        configPath.api_host +
          `/customer/orders/${localStorage.getItem("emailId")}`
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(getOrderDispatcher(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getOpenOrders = () => {
  axios.defaults.headers.common.authorization = localStorage.getItem("IDToken");
  return (dispatch) => {
    //make a get request to fetch customer profile
    axios
      .get(
        configPath.api_host +
          `/customer/orders/list/open/product/${localStorage.getItem("emailId")}`
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(getOpenOrderDispatcher(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const cancelOrderProducts = (payload) => {
  axios.defaults.headers.common.authorization = localStorage.getItem("IDToken");
  return (dispatch) => {
    //make a get request to fetch customer profile
    axios
      .post(
        configPath.api_host +
          `/customer/orders/cancel/product/${localStorage.getItem("emailId")}`,payload
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(cancelOrderProductDispatcher(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};


export const getCancelOrders = (payload) => {
  axios.defaults.headers.common.authorization = localStorage.getItem("IDToken");
  return (dispatch) => {
    //make a get request to fetch cancelled orders
    axios
      .post(
        configPath.api_host +
          `/customer/orders/list/cancel/product/${localStorage.getItem("emailId")}`,payload
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(getCancelOrderDispatcher(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const cancelCompleteOrder = (payload) => {
  axios.defaults.headers.common.authorization = localStorage.getItem("IDToken");
  return (dispatch) => {
    //make a get request to fetch cancelled orders
    axios
      .post(
        configPath.api_host +
          `/customer/orders/list/cancel/order/${localStorage.getItem("emailId")}`,payload
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(cancelCompleteOrderDispatcher(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};


