import {
   GETORDERS
  } from "../action/customerprofileaction/actionType";
  
  const initialState = {
    orders: {},
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case GETORDERS:
        return {
          ...state,
          orders: action.payload.data,
        };
      
      default:
        return state;
    }
  }
  