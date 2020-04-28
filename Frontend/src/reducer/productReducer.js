import {
  GET_PRODUCT,
  ALLPRODUCTS,
  PRODUCT_SEARCH,
  PRODUCT_FILTER,
  PRODUCT_SORT,
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
  productSearch: { search: "", category: "", seller: "" },
  productFilter: {
    rating: 5,
    minPrice: "",
    maxPrice: "",
  },
  productSort: { sortType: "rating", sort: "desc" },
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
        productFilter: {
          rating: "",
          minPrice: "",
          maxPrice: "",
        },
        productSort: { sortType: "rating", sort: "desc" },
        productSearch: { search: "", category: "", seller: "" },
      };

    case ALLPRODUCTS:
      return { ...state, allProducts: payload };

    case PRODUCT_SEARCH:
      return {
        ...state,
        productSearch: {
          search: payload.search,
          category: payload.category,
          seller: payload.seller,
        },
      };

    case PRODUCT_FILTER:
      return {
        ...state,
        productFilter: {
          rating: payload.rating,
          minPrice: payload.minPrice,
          maxPrice: payload.maxPrice,
        },
      };

    case PRODUCT_SORT:
      return {
        ...state,
        productSort: {
          sortType: payload.sortType,
          sort: payload.sort,
        },
      };
    default:
      return state;
  }
}
