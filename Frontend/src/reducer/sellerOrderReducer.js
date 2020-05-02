import {
    GETSELLERORDERS,CANCELSELLERORDERPRODUCT
   } from "../action/Seller/sellerOrderAction/actionType";
   
   const initialState = {
     orders: {},
   };
   
   export default function (state = initialState, action) {
     switch (action.type) {
       case GETSELLERORDERS:
         return {
           ...state,
           orders: action.payload.data,
         };
         
         case CANCELSELLERORDERPRODUCT:
           return{
           ...state,
           orders: action.payload.data,
           cancelmsg:'Order Cancelled Succesfully'
         }
         
       default:
         return state;
     }
   }
   