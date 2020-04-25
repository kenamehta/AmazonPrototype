import {
  GET_PRODUCT,
  ALLPRODUCTS,
  PRODUCT_SEARCH,
} from "../action/ProductAction/actionType";
import { LOGOUT } from "../action/UserAction/actionTypes";

const initialState = {
  product: null,
  allProducts: {
    docs: [],
    page: 0,
    limit: 0,
    pages: 0,
    total: 0,
  },
  productSearch: { search: "", category: "All" },
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCT:
      return {
        ...state,
        product: payload,
      };

    case LOGOUT:
      return {
        product: null,
        allProducts: { docs: [], page: 0, limit: 0, pages: 0, total: 0 },
      };

    case ALLPRODUCTS:
      console.log(state);
      return { ...state, allProducts: payload };

    case PRODUCT_SEARCH:
      return {
        ...state,
        productSearch: { search: payload.search, category: payload.category },
      };

    default:
      return state;
  }
}
