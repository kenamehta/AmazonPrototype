import {
   GETORDERS,CANCELORDERPRODUCT
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
        case CANCELORDERPRODUCT:
          return{
          ...state,
          orders: action.payload.data,
          cancelmsg:'Order Cancelled Succesfully'
        }
      
      default:
        return state;
    }
  }
  