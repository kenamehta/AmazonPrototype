import {
  GET_CATEGORYS,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  CATEGORYS_LOADING,
  SET_MODAL,
  ADD_MODAL,
} from "./types.js";
import axios from "axios";
import configPath from "../../configApp";

export const getCategory = () => (dispatch) => {
  // dispatch(setCategoryLoading());
  axios
    .get(configPath.api_host + "/product/admin/getProductCategory")
    .then((res) => {
      console.log("My categories", res.data);
      return dispatch({
        type: GET_CATEGORYS,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addCategory = (category) => (dispatch) => {
  axios
    .post(configPath.api_host + `/product/admin/addProductCategory`, category)
    .then((res) =>
      dispatch({
        type: ADD_CATEGORY,
        payload: res.data,
        res: res,
      })
    );
};

export const deleteCategory = (name) => (dispatch) => {
  const data = {
    name: name,
  };

  axios
    .post(configPath.api_host + `/product/admin/deleteProductCategory`, data)
    .then((res) => {
      const msg = res.message;
      console.log("delete res", res);
      dispatch({
        type: DELETE_CATEGORY,
        payload: data,
        res: res,
      });
    });
};
export const setModalFalse = () => {
  return {
    type: SET_MODAL,
  };
};
export const setAddModalFalse = () => {
  return {
    type: ADD_MODAL,
  };
};
export const setCategoryLoading = (item) => {
  return {
    type: CATEGORYS_LOADING,
  };
};
