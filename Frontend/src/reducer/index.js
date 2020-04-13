import { combineReducers } from "redux";
import userType from "./userType";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";

const allReducers = combineReducers({
  userType,
  userReducer,
  profile: profileReducer
});

export default allReducers;
