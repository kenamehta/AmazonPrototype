import {
    GETSELLERORDERS,CANCELSELLERORDERPRODUCT,GETOPENSELLERORDER,GETSELLERCANCELORDER
   } from "../action/Seller/sellerOrderAction/actionType";
import { GETCANCELORDER } from "../action/customerprofileaction/actionType";
   
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
         case GETOPENSELLERORDER:
            console.log(action.payload.data)
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
         case GETSELLERCANCELORDER:
         return {
           ...state,
           cancelorders: action.payload.data,
         };
         
       default:
         return state;
     }
   }
   