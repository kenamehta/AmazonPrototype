import { combineReducers } from "redux";
import userType from "./userType";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";
import customerProfileReducer from "./customerProfileReducer";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import savedAndCartProductReducer from "./savedAndCartProductReducer";
import categoryReducer1 from "./admin/categoryReducer.js";
import customerOrderReducer from "./customerOrderReducer";
import customerCheckoutReducer from "./customerCheckoutReducer"

const allReducers = combineReducers({
  userType,
  userReducer,
  profile: profileReducer,
  customerProfileReducer,
  categoryReducer,
  category: categoryReducer1,
  product: productReducer,
  savedAndCartProductReducer,
  customerOrderReducer,
  customerCheckoutReducer
});

export default allReducers;
