import { GET_PRODUCT } from "../action/ProductAction/actionType";
import { LOGOUT } from "../action/UserAction/actionTypes";

const initialState = {
  product: null,
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
      };

    default:
      return state;
  }
}
