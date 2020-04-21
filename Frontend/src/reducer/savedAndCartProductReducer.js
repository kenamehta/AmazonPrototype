import {
  GETSAVEDANDCARTPRODUCTS,
  DELETESAVEDPRODUCTS,
  MOVESAVEDTOCART
} from "../action/customer/savedProducts/actionTypes";

const initialState = { savedCnt: 0, cartCnt: 0 };

export default function(state = initialState, action) {
  switch (action.type) {
    case GETSAVEDANDCARTPRODUCTS:
      return {
        ...state,
        ...action.payload
      };
    case DELETESAVEDPRODUCTS:
      state.savedCnt = state.savedCnt - 1;
      return {
        ...state,
        ...action.payload
      };
    case MOVESAVEDTOCART:
      state.savedCnt = state.savedCnt - 1;
      state.cartCnt = state.cartCnt + 1;
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
