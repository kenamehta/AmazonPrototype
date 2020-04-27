import { PROCEEDTOORDER } from "../action/customer/checkout/actionTypes";

const initialState = {
  orders: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROCEEDTOORDER:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}
