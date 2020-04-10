import { combineReducers } from "redux";
import userType from "./userType";

const allReducers = combineReducers({
  userType: userType,
});

export default allReducers;
