import { PRODUCT_SEARCH } from "../action/ProductAction/actionType";
import { LOGOUT } from "../action/UserAction/actionTypes";

const initialState = {
  productSearch: { search: "", category: "All" },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);

  switch (type) {
    case LOGOUT:
      return {
        productSearch: null,
      };

    case PRODUCT_SEARCH:
      return {
        ...state,
        productSearch: {
          search: payload.search,
          category: payload.category,
        },
      };

    default:
      return state;
  }
}
