import { ALLPRODUCTS } from "./actionType";
import configPath from "../../configApp";
import axios from "axios";

const getAllProductsDispatcher = (payload) => {
  return {
    type: ALLPRODUCTS,
    payload,
  };
};

export const getAllProducts = (data) => {
  return (dispatch) => {
    //make a get request to fetch customer profile
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );
    let sellerEmailId = "";
    if (localStorage.getItem("category") === "seller")
      sellerEmailId = localStorage.getItem("emailId");
    const url =
      "/product/customer/listAllProducts?limit=10&page=" +
      data.page +
      "&orderOn=" +
      data.orderOn +
      "&order=" +
      data.order +
      "&sellerEmailId=" +
      sellerEmailId +
      "&sellerName=" +
      data.sellerName +
      "&productName=" +
      data.productName +
      "&productCategory=" +
      data.productCategory +
      "&minPrice=" +
      data.minPrice +
      "&maxPrice=" +
      data.maxPrice +
      "&minRating=" +
      data.minRating +
      "&maxRating=" +
      data.maxRating;
    axios
      .get(configPath.api_host + url)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(getAllProductsDispatcher(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
