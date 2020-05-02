import {
  GETTRACKING,
  UPDATETRACKING
} from "../action/customerprofileaction/actionType";

const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case GETTRACKING:
      return {
        ...state,
        ...action.payload
      };
    case UPDATETRACKING:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
