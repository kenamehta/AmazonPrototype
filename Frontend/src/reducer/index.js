import { combineReducers } from "redux";
import userType from "./userType";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";
import customerProfileReducer from "./customerProfileReducer";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import savedAndCartProductReducer from "./savedAndCartProductReducer";
import customerOrderReducer from "./customerOrderReducer";

const allReducers = combineReducers({
  userType,
  userReducer,
  profile: profileReducer,
  customerProfileReducer,
  categoryReducer,
  product: productReducer,
  savedAndCartProductReducer,
  customerOrderReducer,
});

export default allReducers;
