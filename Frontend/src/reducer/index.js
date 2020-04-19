import { combineReducers } from "redux";
import userType from "./userType";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";
import customerProfileReducer from "./customerProfileReducer";
import categoryReducer from "./categoryReducer";

const allReducers = combineReducers({
  userType,
  userReducer,
  profile: profileReducer,
  customerProfileReducer,
  categoryReducer,
});

export default allReducers;
