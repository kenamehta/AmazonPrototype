import { GET_PRODUCT, ALLPRODUCTS, PRODUCT_SEARCH } from "./actionType";
import configPath from "../../configApp";
import axios from "axios";

const getProductDispatcher = (payload) => {
  return {
    type: GET_PRODUCT,
    payload,
  };
};

const getAllProductsDispatcher = (payload) => {
  return {
    type: ALLPRODUCTS,
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
      "/product/customer/listAllProducts?limit=20&page=" +
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

export const updateProductSearch = (search, category) => {
  return {
    type: PRODUCT_SEARCH,
    newState: {
      search: search,
      category: category,
    },
  };
};
