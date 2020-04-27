import {
   GETORDERS,CANCELORDERPRODUCT,GETCANCELORDER,GETOPENORDERS,CANCELCOMPLETEORDERS
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
        case GETOPENORDERS:
        console.log(action.payload.data)
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
        case GETCANCELORDER:
          return {
            ...state,
            cancelorders: action.payload.data
          };
          case CANCELCOMPLETEORDERS:
            return{
              ...state,
              orders: action.payload.data,
              cancelmsg:'Order Cancelled Succesfully'
            }
      default:
        return state;
    }
  }
  