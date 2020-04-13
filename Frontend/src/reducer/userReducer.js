import {
  LOGIN,
  REGISTERCUSTOMER,
  REGISTERSELLER,
  LOGOUT
} from "./../action/UserAction/actionTypes";

const initialState = { loginFlag: false };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      console.log(action.payload);
      return {
        ...state,
        ...action.payload
        // id: action.payload.id,
        // idToken: action.payload.idToken,
        // res: action.payload.res,
        // loginFlag: action.payload.loginFlag,
        // category: action.payload.category
      };
    }
    case LOGOUT: {
      return {
        ...state,
        ...action.payload
      };
    }
    case REGISTERCUSTOMER: {
      return {
        ...state,
        ...action.payload
      };
    }
    case REGISTERSELLER: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
};

export default userReducer;
