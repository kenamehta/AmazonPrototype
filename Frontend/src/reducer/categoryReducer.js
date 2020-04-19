import { CATEGORY } from "../action/ProductAction/actionType";

const initialState = {
  category: [{}],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
}
