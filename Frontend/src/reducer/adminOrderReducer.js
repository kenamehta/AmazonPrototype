import {
    GETADMINORDERS
   } from "../action/admin/types";
   
   const initialState = {
     orders: {},
   };
   
   export default function (state = initialState, action) {
     switch (action.type) {
       case GETADMINORDERS:
         return {
           ...state,
           orders: action.payload.data,
         };
        
       default:
         return state;
     }
   }
   