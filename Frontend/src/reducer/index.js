import { combineReducers } from "redux";
import userType from "./userType";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";
import customerProfileReducer from "./customerProfileReducer";

const allReducers = combineReducers({
  userType,
  userReducer,
  profile: profileReducer,
  customerProfileReducer
});

export default allReducers;
