import {
  GETSAVEDANDCARTPRODUCTS,
  DELETESAVEDPRODUCTS,
  MOVESAVEDTOCART,
  DELETECARTPRODUCT,
  MOVECARTTOSAVED
} from "../action/customer/savedAndCartProducts/actionTypes";

const initialState = { savedCnt: 0, cartCnt: 0 };

export default function(state = initialState, action) {
  switch (action.type) {
    case GETSAVEDANDCARTPRODUCTS:
      return {
        ...state,
        ...action.payload
      };
    case DELETESAVEDPRODUCTS:
      return {
        ...state,
        ...action.payload
      };
    case MOVESAVEDTOCART:
      return {
        ...state,
        ...action.payload
      };
    case DELETECARTPRODUCT:
      return {
        ...state,
        ...action.payload
      };
    case MOVECARTTOSAVED:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}
