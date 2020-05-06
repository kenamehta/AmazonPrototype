import {
  GET_PRODUCT,
  ALLPRODUCTS,
  PRODUCT_SEARCH,
  PRODUCT_FILTER,
  PRODUCT_SORT,
  DELETE_PRODUCT
} from "./actionType";
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

  console.log("CALINGGG in getProduct in productAction.js");
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
    if (data.sellerEmailId !== "") sellerEmailId = data.sellerEmailId;
    else if (localStorage.getItem("category") === "seller")
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

export const updateProductSearch = (search, category, seller) => {
  return {
    type: PRODUCT_SEARCH,
    payload: {
      search,
      category,
      seller,
    },
  };
};

export const updateProductSort = (sortType, sort) => {
  return {
    type: PRODUCT_SORT,
    payload: {
      sortType,
      sort,
    },
  };
};

export const addComment = (data) => async (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem("IDToken");
  try {
    const res = await axios.post(
      configPath.api_host + `/product/customer/addComment`,
      data
    );

    if (res.status === 200) {
      console.log(res.data);
      dispatch(getProductDispatcher(res.data));
    } else {
      // window.alert(res.data);
    }
  } catch (error) {
    // window.alert('Error in addComment action in productActions.js');
    console.log("Error in addComment action in productActions.js");
    console.log(error);
  }
};

export const deleteProduct = (data) => async (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem("IDToken");
  try{
    const res = await axios.post(
      configPath.api_host + `/product/seller/removeProduct`,
      data
    );
    if(res.status === 200) {
      console.log(res.data);
      window.alert('Deleted the product');
    }
  } catch (error) {
    window.alert('Error in removing the Product');
    console.log("Error in deleteProduct action in productActions.js");
    console.log(error);
  }
}

export const updateProductFilter = (rating, minPrice, maxPrice) => {
  return {
    type: PRODUCT_FILTER,
    payload: {
      rating,
      minPrice,
      maxPrice,
    },
  };
};
