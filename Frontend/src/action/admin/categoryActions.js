import {
  GET_CATEGORYS,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  CATEGORYS_LOADING,
} from "./types.js";
import axios from "axios";

export const getCategory = () => (dispatch) => {
  dispatch(setCategoryLoading());
  axios.get("/api/category").then((res) =>
    dispatch({
      type: GET_CATEGORYS,
      payload: res.data,
    })
  );
};

export const addCategory = (category) => (dispatch) => {
  axios.post("/addProductCategory", category).then((res) =>
    dispatch({
      type: ADD_CATEGORY,
      payload: res.data,
    })
  );
};

export const deleteCategory = (id) => (dispatch) => {
  axios.delete(`/deleteProductCategory/${id}`).then((res) =>
    dispatch({
      type: DELETE_CATEGORY,
      payload: id,
    })
  );
};
export const setCategoryLoading = (item) => {
  return {
    type: CATEGORYS_LOADING,
  };
};
