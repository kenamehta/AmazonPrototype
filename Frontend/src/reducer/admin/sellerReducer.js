import { GET_SELLERS, UPDATE_SELLER_LIST } from "./../../action/admin/types.js";
const initialSate = {
  sellers: [],
};

export default function (state = initialSate, action) {
  switch (action.type) {
    case GET_SELLERS:
      return {
        ...state,
        sellers: action.payload,
      };
    case UPDATE_SELLER_LIST:
      return {
        ...state,
        sellers: action.payload,
      };

    default:
      return state;
  }
}
