import { combineReducers } from "redux";
import userType from "./userType";
import userReducer from "./userReducer";

const allReducers = combineReducers({
  userType,
  userReducer
});

export default allReducers;
